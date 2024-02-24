const {User, UserInfo} = require("../models/mongo");

const getUsers = async (req, res) => {
    let query = {};
    let users = [];
    if(req.query.limit){
        if (req.query.username) {
            query.username = req.query.username;
        }
        if (req.query.email) {
            query.email = req.query.email;
        }
        if (req.query.user_id) {
            query.user_id = req.query.user_id;
        }
        if (req.query.password) {
            query.password = req.query.password;
        }
        users = await User.find(query).limit(req.query.limit);
    }else{
        users= await User.find();
    }
    if(users){
        res.status(200).json(users);
    }else{
        res.status(404).json({ error: 'Users not found' });
    }
}

// const signup = async (req, res) => {
//         const lastUserInfo = await User.findOne({}, {}, { sort: { 'user_info_id': -1 } });
//
//         const lastUser = await User.findOne({}, {}, { sort: { 'user_id': -1 } });
//
//         const userInfoData = {
//             role: null,
//             content_type: null,
//             creation_frequency: null,
//             monthly_earnings: null,
//             join_date: null,
//             membership_level: null,
//             monthly_contribution: null,
//             user_id: lastUser ? lastUser.user_id + 1 : 1,
//         };
//         userInfoData.user_info_id = lastUserInfo ? lastUserInfo.user_info_id + 1 : 1;
//
//         const newUser = new User({ ...req.body, ...userInfoData });
//
//         const savedUser = await newUser.save();
//
//         const lastUserInfoId = userInfoData.user_info_id
//
//         const newUserInfoData = {
//             _id: lastUserInfoId,
//             ...userInfoData,
//         };
//
//         const newUserInfo = new UserInfo(newUserInfoData);
//
//         await newUserInfo.save();
//
//         res.status(201).json(savedUser);
// }

module.exports = {
    getUsers
}