import { useState } from "react"
import Modal from "../Modal"
import OTPVerification from "./OTPVerification"
import ResetPassword from "./ResetPassword"
import ChangePassword from "./ChangePassword"


export default function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [oldPassword,setOldPassword] = useState('')
  const [state,setState] = useState<'reset-password'|'verify-otp'|'change-password'>('reset-password')
  const [loading,setLoading] = useState(false)
  const [resetToken,setResetToken] = useState('')
  const [OTPExpiryTime,setOTPExpiryTime] = useState(0)
  const steps = [
    {
      name:"reset-password",
      message:"Enter your current password",
    }, 
    {
      name:"verify-otp",
      message:"Enter your current password",
    }, 
    {
      name:"change-password",
      message:"Change your password",
    }, 
  ]
  



  return (
    <Modal stableClick loading={loading} title="Change Password" onClose={onClose}>
      <div className="flex gap-2 mb-5">
        {steps.map((s, i) => (
          <div key={i} className={`flex-1 h-1.5 mb-2 rounded-full transition-colors ${s.name == state ? 'bg-conduit' : 'bg-muted/20'}`} />
        ))}
      </div>
      {state ==='verify-otp'?(
        <OTPVerification setOTPExpiryTime = {setOTPExpiryTime} OTPExpiryTime={OTPExpiryTime} setResetToken={setResetToken} setLoading={setLoading} loading={loading} oldPassword={oldPassword} setState={setState}/>

      ):state ==='change-password' && resetToken?(

        <ChangePassword setLoading={setLoading} loading={loading} oldPassword={oldPassword} setOldPassword={setOldPassword} setState={setState}/>
      ):(
        <ResetPassword setOTPExpiryTime = {setOTPExpiryTime}  setLoading={setLoading} loading={loading} oldPassword={oldPassword}  setOldPassword={setOldPassword} setState={setState}/>
      )}
    </Modal>
  )
}