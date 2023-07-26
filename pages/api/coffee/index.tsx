import { NextApiRequest, NextApiResponse } from 'next';

const coffee= (req:NextApiRequest,res: NextApiResponse)=>{
    res.status(200).json({message:'coffee'})
}

export default coffee

