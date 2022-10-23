import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function workshop(req: NextApiRequest, res: NextApiResponse) {
    const id = parseInt(req.query.id as string);
    if (isNaN(id))
        return res.status(422).json({ error: "id should be int" })
    switch (req.method) {
        case "DELETE":
            let data = await prisma.workshop.delete({ where: { id } });;
            return res.status(200).json(data);
        case "PUT":
            let data = await prisma.workshop.update({ where: { id }, data: req.body });;
            return res.status(200).json(data)
        case "GET":
            let data = await prisma.workshop.findUnique({ where: { id } });
            return res.send({ workshops: data });
        default:
            return res.status(405).send({ message: "methods not allowed" })
    }

};