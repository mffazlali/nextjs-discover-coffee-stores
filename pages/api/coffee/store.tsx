import { NextApiRequest, NextApiResponse } from 'next';

const store= (req:NextApiRequest,res: NextApiResponse)=>{
    res.status(200).json({message:'store'})
}

export default store

