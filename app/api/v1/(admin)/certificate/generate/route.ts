import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Certificate from "@/models/Certificate";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const  {memberId} = await req.json();

  const member = await User.findById(memberId);

  if (!member) {
    return NextResponse.json({ message: "Member not found" }, { status: 404 });
  }
  const existing = await Certificate.findOne({memberId});

  if (existing) {
    return NextResponse.json({
      success: true,
      message: "Certificate already exists",
      fileUrl: existing,
    });
  }
  // certificate number
  const certNo = "CERT-" + Date.now();

  // load image
  const imagePath = path.join(process.cwd(), "public/certificate-template.png");
  const imageBytes = fs.readFileSync(imagePath);

  const pdfDoc = await PDFDocument.create();

  const pngImage = await pdfDoc.embedPng(imageBytes);
  const page = pdfDoc.addPage([
    pngImage.width,
    pngImage.height,
  ]);

  // draw image as background
  page.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: pngImage.width,
    height: pngImage.height,
  });

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // 1. NAME — centered
  const nameFontSize = 36;
  const nameText = member.fullName.toUpperCase();
  const nameWidth = font.widthOfTextAtSize(nameText, nameFontSize);

  page.drawText(nameText, {
    x: (pngImage.width - nameWidth) / 2,  // auto-centers any name
    y: 780,
    size: nameFontSize,
    font,
    color: rgb(0.1, 0.1, 0.35),
  });

  // 2. ISSUED DATE
  page.drawText(new Date().toLocaleDateString(), {
    x: 490,
    y: 440,
    size: 22,
    font,
    color: rgb(0.1, 0.1, 0.1),
  });

  // 3. MEMBERSHIP / CERT ID
  page.drawText(certNo, {
    x: 1670,
    y: 440,
    size: 22,
    font,
    color: rgb(0.1, 0.1, 0.1),
  });

  const pdfBytes = await pdfDoc.save();

  const fileName = `${certNo}.pdf`;
  const savePath = path.join(process.cwd(), "public/certificates", fileName);

  fs.writeFileSync(savePath, pdfBytes);

  const fileUrl = `/certificates/${fileName}`;

  await Certificate.create({
    memberId: member._id,
    memberName: member.fullName,
    certificateNo: certNo,
    fileUrl,
  });

  return NextResponse.json({
    success: true,
    fileUrl,
  });
}