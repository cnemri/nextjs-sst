import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Bucket } from "sst/node/bucket";
import Form from "./components/Form";

export const dynamic = "force-dynamic";

export default async function Home() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: Bucket.public.bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form url={url} />
    </main>
  );
}
