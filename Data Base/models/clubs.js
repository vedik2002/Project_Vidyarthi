const mongoose = require('mongoose')

const ClubSchema = new mongoose.Schema(
    {
        club_name: { type: String, required: true, unique: true },
		club_url: { type: String, required: true,unique:true },
        avatar :{
            data: req.body.data.image,
            contentType: 'image/png',
        },
        
    }
)

    const club = mongoose.model('ClubSchema',ClubSchema)

    module.exports = club

