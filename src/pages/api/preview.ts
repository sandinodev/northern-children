import { NextApiHandler } from "next";

const _: NextApiHandler = async (req, res) => {
  if (!req.query["x-craft-live-preview"] || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const location = req.query.slug === "home" ? "/" : `/${req.query.slug}`;

  res.setPreviewData({ previewToken: req.query.token ?? null });
  res.writeHead(307, { Location: location });
  res.end();
};
