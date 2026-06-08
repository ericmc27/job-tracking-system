import { s3Client } from "../server.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "../lib/prisma.js";

export async function getPresignedUrl(req, res) {
  const session = req.session
  const { fileName, fileType } = req.query;

  const key = `resumes/${session.user.id}-${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  const resumeUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { resumeUrl },
  });

  res.json({ presignedUrl });
}
