import { NextApiRequest, NextApiResponse } from "next";
import { Comic } from "dh-marvel/features/card.type";
import { getComics } from "dh-marvel/services/marvel/marvel.service";

type Data = {
  comics: Comic[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { offset, limit  } = req.query;
    const comics = await getComics(Number(offset), Number(limit));
    res.status(200).json({ comics: comics.data });
  }
}
