
import { NextApiRequest, NextApiResponse } from "next";

const workshops = [
    "Getting Started: Quick Steps",
    "Getting Started: Quick Steps face-to-face",
    "Getting Started: Step by Step face-to-face",

]

export default async function  workshop(req: NextApiRequest, res: NextApiResponse){
    res.send({ workshops });
};
