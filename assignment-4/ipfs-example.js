const fs = require("fs");
const path = require("path");

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_UPLOAD_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs";

async function uploadFileToIPFS(filePath) {
  if (!PINATA_JWT) {
    throw new Error("Set the PINATA_JWT environment variable before uploading.");
  }

  const absolutePath = path.resolve(filePath);
  const fileBuffer = fs.readFileSync(absolutePath);

  const formData = new FormData();
  formData.append("file", new Blob([fileBuffer]), path.basename(absolutePath));

  const response = await fetch(PINATA_UPLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Pinata upload failed: ${errorBody}`);
  }

  const result = await response.json();
  return result.IpfsHash;
}

function getGatewayUrl(cid) {
  return `${PINATA_GATEWAY}/${cid}`;
}

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.log("Usage: node ipfs-example.js <file-path>");
    process.exit(1);
  }

  const cid = await uploadFileToIPFS(filePath);

  console.log("Upload successful.");
  console.log("CID:", cid);
  console.log("Gateway URL:", getGatewayUrl(cid));
  console.log("Store this CID in the smart contract using storeCID(cid).");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
