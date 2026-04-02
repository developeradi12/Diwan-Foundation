import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import AchivementCertificate from "@/models/AchivementCertificate";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { memberId } = await req.json();

  const member = await User.findById(memberId);

  if (!member) {
    return NextResponse.json({ message: "Member not found" }, { status: 404 });
  }
  const existing = await AchivementCertificate.findOne({userId: memberId });
  
  if (existing) {
    return NextResponse.json(
      {
        success: true,
        message: "Certificate already exists",
        fileUrl: existing.fileUrl,
      });
  }
  
  const certNo = "CERT-" + Date.now();

  // Load PNG template
  const imagePath = path.join(process.cwd(), "public/achivement-certificate.png");
  const imageBytes = fs.readFileSync(imagePath);

  const pdfDoc = await PDFDocument.create();
  const pngImage = await pdfDoc.embedPng(imageBytes);

  const W = pngImage.width;
  const H = pngImage.height;

  const page = pdfDoc.addPage([W, H]);

  // Draw template as background
  page.drawImage(pngImage, { x: 0, y: 0, width: W, height: H });

  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // NAME — centered on the name line (confirmed: W/2, 700)
  const nameFontSize = 36;
  const nameText = member.fullName.toUpperCase();
  const nameWidth = boldFont.widthOfTextAtSize(nameText, nameFontSize);
  page.drawText(nameText, {
    x: (W - nameWidth) / 2,
    y: 700,
    size: nameFontSize,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.35),
  });

  // DATE — blank space before "under" (confirmed: 1490, 580)
  page.drawText(new Date().toLocaleDateString(), {
    x: 1490,
    y: 580,
    size: 22,
    font: regularFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  const pdfBytes = await pdfDoc.save();

  const outDir = path.join(process.cwd(), "public/achievement-certificates");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const fileName = `${certNo}.pdf`;
  fs.writeFileSync(path.join(outDir, fileName), pdfBytes);

  const fileUrl = `/achievement-certificates/${fileName}`;

  await AchivementCertificate.create({
    userId: member._id,
    userName: member.fullName,
    certificateNo: certNo,
    fileUrl,
  });

  return NextResponse.json({ success: true, fileUrl });
}