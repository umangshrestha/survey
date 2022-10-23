import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function workshop(req: NextApiRequest, res: NextApiResponse) {
    const { workshop, ...formData } = JSON.parse(req.body);
    switch (req.method) {
        case "POST":
            const data = await prisma.feedback.create({
                data: {
                    ...formData,
                    workshop: {
                        connectOrCreate: {
                            where: { workshop },
                            create: { workshop },
                        }
                    },
                }
            });
            return res.status(200).json(data)
        case "GET":
            return res.send({ workshops: await prisma.workshop.findMany() });
        default:
            return res.status(405).send({ message: "methods not allowed" })
    }

};
