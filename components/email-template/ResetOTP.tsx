import React from 'react'

interface emailProps{
    firstname:string
    code:string
}

export default function ResetOTP(props:emailProps) {
    const {firstname,code} = props
  return (
 <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9'}}>
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                <h1 style={{ color: '#333333', fontSize: '24px', marginBottom: '20px' }}>
                    Hi, {firstname}
                </h1>
                
                <p style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5', marginBottom: '20px'}}>
                    An action has been made to reset your password. To verify your identity enter the code below on the email verification page.
                </p>
                
                <div style={{ textAlign: 'center', margin: '30px 0'}}>
                    <span style={{ display: 'inline-block', fontSize: '32px', fontWeight: 'bold', letterSpacing: '5px', color: '#4F46E5', backgroundColor: '#F3F4F6', padding: '15px 25px', borderRadius: '6px', fontFamily: 'monospace' }}>
                        {code}
                    </span>
                </div>
                
                <p style={{ color: '#555555', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px' }}>
                    If you did not make this change, or believe an unauthorized person has accessed your account, please report this action at{' '}
                    <a href="https://conduit-services.vercel.app/help" style={{ color: '#4F46E5', textDecoration: 'underline' }}>
                        Conduit
                    </a>{' '}
                    as soon as possible.
                </p>
                
                <p style={{ color: '#555555', marginBottom: '5px' }}>Sincerely,</p>
                <p style={{ color: '#4F46E5', fontWeight: 'bold' }}>Conduit.</p>
            </div>
        </div>
    )
}
