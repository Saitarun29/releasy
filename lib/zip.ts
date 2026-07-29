import JSZip from "jszip";

interface ZipEntry {
  name: string;
  content: string;
}

export async function downloadAllAsZip(
  entries: ZipEntry[],
  filename = "releasy-assets.zip"
): Promise<void> {
  const zip = new JSZip();

  for (const entry of entries) {
    zip.file(entry.name, entry.content);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
