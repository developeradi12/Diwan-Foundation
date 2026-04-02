import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import IDCardModel from "@/models/Idcard";


export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { memberId } = await req.json();

  const member = await User.findById(memberId);
  console.log("member",member)
  
  if (!member) {
    return NextResponse.json({ message: "Member not found" }, { status: 404 });
  }

  const existing = await IDCardModel.findOne({userId : memberId});
  if (existing) {
    return NextResponse.json
      (
        {
          success: true,
          message: "Certificate already exists",
          fileUrl: existing.fileUrl,
        });
  }
  const certNo = "IDCARD-" + Date.now();
  // ── Load PNG template ──
  const templatePath = path.join(process.cwd(), "public/idcard-template.png");
  const templateBytes = fs.readFileSync(templatePath);

  const pdfDoc = await PDFDocument.create();
  const templateImage = await pdfDoc.embedPng(templateBytes);

  const W = templateImage.width;  // 591
  const H = templateImage.height; // 1004

  const page = pdfDoc.addPage([W, H]);

  // Draw template as background
  page.drawImage(templateImage, { x: 0, y: 0, width: W, height: H });

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ── Helper: center text horizontally ──
  const drawCentered = (
    text: string,
    y: number,
    size: number,
    f: typeof bold,
    color: ReturnType<typeof rgb>
  ) => {
    const textWidth = f.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (W - textWidth) / 2, y, size, font: f, color });
  };

  // ── Helper: truncate text to max width ──
  const truncate = (text: string, maxWidth: number, size: number, f: typeof font) => {
    let t = text;
    while (f.widthOfTextAtSize(t, size) > maxWidth && t.length > 0) {
      t = t.slice(0, -1);
    }
    return t === text ? text : t + "…";
  };

  // ════════════════════════════════════════
  // 1. PHOTO  — from debug: x=186, y=620, size=220x220
  // ════════════════════════════════════════
  const PHOTO_X = 186;
  const PHOTO_Y = 620;
  const PHOTO_SIZE = 220;

  let photoEmbedded = false;

  if (member.profilePhoto) {
    try {
      const photoPath = path.join(process.cwd(), "public", member.profilePhoto);

      if (fs.existsSync(photoPath)) {
        const photoBytes = fs.readFileSync(photoPath);
        const ext = path.extname(photoPath).toLowerCase();

        const photo =
          ext === ".png"
            ? await pdfDoc.embedPng(photoBytes)
            : await pdfDoc.embedJpg(photoBytes);

        page.drawImage(photo, {
          x: PHOTO_X,
          y: PHOTO_Y,
          width: PHOTO_SIZE,
          height: PHOTO_SIZE,
        });

        photoEmbedded = true;
      }
    } catch (err) {
      console.warn("Photo embed failed, using fallback:", err);
    }
  }

  // ── Fallback: no photo → draw DiWAN logo inside circle ──
  if (!photoEmbedded) {
    try {
      const logoPath = path.join(process.cwd(), "public/logo.png"); // your logo
      if (fs.existsSync(logoPath)) {
        const logoBytes = fs.readFileSync(logoPath);
        const logo = await pdfDoc.embedPng(logoBytes);

        // Draw logo smaller + centered inside the circle
        const logoSize = 120;
        const logoPadding = (PHOTO_SIZE - logoSize) / 2;

        page.drawImage(logo, {
          x: PHOTO_X + logoPadding,
          y: PHOTO_Y + logoPadding,
          width: logoSize,
          height: logoSize,
        });
      } else {
        // No logo either → draw initials circle
        const cx = PHOTO_X + PHOTO_SIZE / 2;
        const cy = PHOTO_Y + PHOTO_SIZE / 2;

        // Cyan filled circle background
        page.drawEllipse({
          x: cx,
          y: cy,
          xScale: PHOTO_SIZE / 2 - 10,
          yScale: PHOTO_SIZE / 2 - 10,
          color: rgb(0.0, 0.75, 0.87), // cyan matching template
        });

        // Initials (first letters of name)
        const initials = (member.fullName ?? "?")
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        const initialsSize = 72;
        const initialsW = bold.widthOfTextAtSize(initials, initialsSize);

        page.drawText(initials, {
          x: cx - initialsW / 2,
          y: cy - initialsSize / 3,
          size: initialsSize,
          font: bold,
          color: rgb(1, 1, 1),
        });
      }
    } catch (err) {
      console.warn("Fallback draw failed:", err);
    }
  }

  // ════════════════════════════════════════
  // 2. NAME — centered, y=530 (between circle and ID No)
  // ════════════════════════════════════════
  drawCentered(
    truncate(member.fullName ?? "", W - 40, 22, bold),
    530,
    22,
    bold,
    rgb(1, 1, 1)
  );

  const valueColor = rgb(1, 1, 1);
  const valueSize = 20;
  const maxValueW = W - 210; // space after labels

  // ════════════════════════════════════════
  // 3. ID No — x=200, y=379
  // ════════════════════════════════════════
  page.drawText(certNo,
    { x: 200, y: 379, size: valueSize, font, color: valueColor }
  );

  // ════════════════════════════════════════
  // 4. E-mail — x=200, y=318
  // ════════════════════════════════════════
  page.drawText(
    truncate(member.email ?? "", maxValueW, valueSize, font),
    { x: 200, y: 318, size: valueSize, font, color: valueColor }
  );

  // ════════════════════════════════════════
  // 5. Phone — x=202, y=252
  // ════════════════════════════════════════
  page.drawText(
    truncate(member.phone ?? "", maxValueW, valueSize, font),
    { x: 202, y: 251, size: valueSize, font, color: valueColor }
  );

  // ════════════════════════════════════════
  // 6. Issued Date — x=264, y=185
  // ════════════════════════════════════════
  const issuedDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  page.drawText(issuedDate, {
    x: 277,
    y: 175,
    size: valueSize,
    font,
    color: valueColor,
  });

  // ── Save ──

  const pdfBytes = await pdfDoc.save();

  const outDir = path.join(process.cwd(), "public/idcards");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const fileName = `${certNo}.pdf`;
  fs.writeFileSync(path.join(outDir, fileName), pdfBytes);

  const fileUrl = `/idcards/${fileName}`;

  await IDCardModel.create({
    userId: member._id,
    userName: member.fullName,
    certificateNo: certNo,
    fileUrl,
  });

  return NextResponse.json({ success: true, fileUrl });
}
