import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
    return res.json({
        data: "yolo"
    })
}

export default handler