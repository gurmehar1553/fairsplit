require('dotenv').config()

const signupRouter = require('express').Router()
const Users = require('../modals/userModals')
const UserOTPVerification = require('../modals/UserOTPVerification')
const {info}=require('../utils/logger')
const { transporter } = require('./transporter')

signupRouter.post('/',async (req,res)=>{

    const {username,email,password} = req.body

    info("got the hit")
    const userResults = Users.find({$or:[{username},{email}]})
    if(result.length){
        res.json({
            status : "Failed",
            message : "User with the provided email already exists"
        })
    }
    else{
        const newUser = new Users({
            username,
            email,
            password,
            verified:false
        })
        newUser.save().then((result)=>{
            sendOTPVerificationEmail(result,res)
        })
    }
})
    // res.send(true)

const sendOTPVerificationEmail = async ({_id,email},res)=>{
    try{
        const otp=`${Math.floor(Math.random()*10000)}`
        const mailOptions = {
            from : process.env.AUTH_EMAIL,
            to : email,
            subject : "Verify Your Email",
            html : `<p>Enter <b>${otp}</b> in the app to verify your email address.</p><p>This code <b>expires in 1 hour</b></p>`
        }
        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp:otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000
        })
        await newOTPVerification.save()
        await transporter.sendMail(mailOptions)
        res.json({
            status:"PENDING",
            message:"Verification otp email sent",
            data:{
                userId: _id,
                email
            }
        })
    }
    catch(error){
        res.json({
            status:"FAILED",
            message:error.message
        })
    }
}

signupRouter.post("/verifyOTP", async (req,res)=>{
    try{
        let {userId,otp} = req.body;
        if(!userId || !otp){
            throw Error("Empty otp details are not allowed");
        }
        else{
            const UserOTPVerificationRecords=await UserOTPVerification.find({
                userId
            })
            if(UserOTPVerificationRecords.length<=0){
                throw new Error("Account record doesn't exist or has been verified already. Please sign up or log in.")
            }
            else{
                const {expiresAt} = UserOTPVerificationRecords[0];
                const otpReceived=UserOTPVerificationRecords[0].otp;
                if(expiresAt < Date.now()){
                    await UserOTPVerification.deleteMany({userId})
                    throw new Error("Code has expired. Please request again.");
                }
                else{
                    if(otpReceived !== otp){
                        throw new Error("Invalid code passed. Check your inbox.")
                    }
                    else{
                        await Users.updateOne({_id:userId},{verified:true})
                        await UserOTPVerification.deleteMany({userId})
                        res.json({
                            status:"VERIFIED",
                            message:"User email verified successfully"
                        })
                    }
                }
            }
        }
    }
    catch(error){
        res.json({
            status:"FAILED",
            message:error.message
        })
    }
})

module.exports = signupRouter