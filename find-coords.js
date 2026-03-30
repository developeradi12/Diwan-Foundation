const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function findCoords() {
  const templatePath = path.join(process.cwd(), "public/idcard-template.png");
  const imageBytes = fs.readFileSync(templatePath);

  const pdfDoc = await PDFDocument.create();
  const pngImage = await pdfDoc.embedPng(imageBytes);

  const W = pngImage.width;   // 591
  const H = pngImage.height;  // 1004

  const page = pdfDoc.addPage([W, H]);
  page.drawImage(pngImage, { x: 0, y: 0, width: W, height: H });

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Grid
  for (let y = 0; y <= H; y += 20) {
    const major = y % 100 === 0;
    page.drawLine({ start: { x: 0, y }, end: { x: W, y }, thickness: major ? 1 : 0.3, color: rgb(1, 0, 0), opacity: major ? 0.6 : 0.2 });
    if (major) page.drawText(`y=${y}`, { x: 4, y: y + 4, size: 18, font, color: rgb(0.9, 0, 0) });
  }
  for (let x = 0; x <= W; x += 20) {
    const major = x % 100 === 0;
    page.drawLine({ start: { x, y: 0 }, end: { x, y: H }, thickness: major ? 1 : 0.3, color: rgb(0, 0, 1), opacity: major ? 0.6 : 0.2 });
    if (major) page.drawText(`x=${x}`, { x: x + 3, y: 10, size: 18, font, color: rgb(0, 0, 0.9) });
  }

  // ── CORRECTED photo circle (center raised to y=730) ──
  const CIRCLE_CX = 296;   // horizontal center
  const CIRCLE_CY = 730;   // ✅ raised from 620 → 730
  const CIRCLE_R  = 110;   // radius

  // Green crosshair
  page.drawLine({ start: { x: CIRCLE_CX - CIRCLE_R - 20, y: CIRCLE_CY }, end: { x: CIRCLE_CX + CIRCLE_R + 20, y: CIRCLE_CY }, thickness: 2, color: rgb(0, 1, 0), opacity: 0.9 });
  page.drawLine({ start: { x: CIRCLE_CX, y: CIRCLE_CY - CIRCLE_R - 20 }, end: { x: CIRCLE_CX, y: CIRCLE_CY + CIRCLE_R + 20 }, thickness: 2, color: rgb(0, 1, 0), opacity: 0.9 });

  // Green bounding box
  page.drawRectangle({
    x: CIRCLE_CX - CIRCLE_R,
    y: CIRCLE_CY - CIRCLE_R,
    width: CIRCLE_R * 2,
    height: CIRCLE_R * 2,
    borderColor: rgb(0, 1, 0),
    borderWidth: 2.5,
    opacity: 0,
    borderOpacity: 1,
  });

  page.drawText(`PHOTO (${CIRCLE_CX - CIRCLE_R}, ${CIRCLE_CY - CIRCLE_R})  ${CIRCLE_R * 2}x${CIRCLE_R * 2}`, {
    x: CIRCLE_CX - CIRCLE_R,
    y: CIRCLE_CY - CIRCLE_R - 28,
    size: 16, font: bold, color: rgb(0, 0.8, 0),
  });

  // ── CORRECTED field positions ──
  const fields = [
    { label: "NAME",        x: W / 2, y: 530 },  // below circle bottom (620-60)
    { label: "ID_VALUE",    x: 200,   y: 379 },  // inline with "ID No :"
    { label: "EMAIL_VALUE", x: 200,   y: 318 },  // inline with "E-mail :"
    { label: "PHONE_VALUE", x: 202,   y: 252 },  // inline with "Phone :"
    { label: "DATE_VALUE",  x: 284,   y: 185 },  // inline with "Issued Date:"
  ];

  for (const f of fields) {
    page.drawRectangle({ x: f.x - 8, y: f.y - 8, width: 16, height: 16, color: rgb(1, 0, 0), opacity: 0.9 });
    page.drawText(f.label, { x: f.x + 14, y: f.y + 4, size: 18, font: bold, color: rgb(1, 0, 0) });
    page.drawText(`(${Math.round(f.x)}, ${Math.round(f.y)})`, { x: f.x + 14, y: f.y - 20, size: 14, font, color: rgb(0.7, 0, 0) });
  }

  page.drawText(`${W} x ${H} pts`, { x: W - 220, y: H - 40, size: 22, font, color: rgb(0, 0, 0), opacity: 0.35 });

  const outDir = path.join(process.cwd(), "public/idcards");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "debug-idcard.pdf");
  fs.writeFileSync(outPath, await pdfDoc.save());

  console.log("✅ Saved:", outPath);
  console.log(`\n📷 PHOTO BOX → x:${CIRCLE_CX - CIRCLE_R}, y:${CIRCLE_CY - CIRCLE_R}, size:${CIRCLE_R * 2}x${CIRCLE_R * 2}`);
  fields.forEach(f => console.log(`   ${f.label.padEnd(14)} → x:${f.x}, y:${f.y}`));
}

findCoords().catch(console.error);