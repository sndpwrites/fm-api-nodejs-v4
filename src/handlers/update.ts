import prisma from "../db"

export const getOneUpdate = async (req,res) => {
    const update = await prisma.update.findUnique({
        where : {
            id: req.params.id
        }
    })
    res.json({data:update})
}

export const getUpdates = async (req,res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates,...product.updates]
    }, [])
    res.json({data: updates})
}

export const createUpdate = async (req,res) => {
    const product = await prisma.product.findUnique({
       where: {
        id: req.body.productId
       } 
    })
    if (!product) {
        res.json({message: 'nope'})
    }

    const update = await prisma.update.create({
        data: req.body
    })
    res.json({data:update})
}

export const updateUpdate = async (req,res) => {}

export const deleteUpdate = async (req,res) => {}