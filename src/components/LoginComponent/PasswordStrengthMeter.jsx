import React, { useEffect } from 'react'

const PasswordStrengthMeter = ({ password }) => {
    const hasLength = () => password.length > 7
    const hasLowerCase = () => /[a-z]/.test(password)
    const hasUpperCase = () => /[A-Z]/.test(password)
    const hasNumber = () => /[0-9]/.test(password)
    const hasSpecialChar = () => /[^a-zA-Z0-9]/.test(password)

    const calculateStrength = () => {
        let strength = 0
        if (hasLength()) strength += 1
        if (hasLowerCase()) strength += 1
        if (hasUpperCase()) strength += 1
        if (hasNumber()) strength += 1
        if (hasSpecialChar()) strength += 1
        return strength
    }

    function getColor(strength) {
        switch (strength) {
            case 0:
                return 'bg-red-300'
            case 1:
                return 'bg-red-300'
            case 2:
                return 'bg-orange-300'
            case 3:
                return 'bg-yellow-300'
            case 4:
                return 'bg-blue-300'
            case 5:
                return 'bg-green-400'
            default:
                return 'bg-gray-300'
        }
    }

    const strength = calculateStrength()
    const barColor = getColor(strength)
    const barWidth = `w-${strength}/5`

    // useEffect(() => {
    //     console.log(hasLength())
    // }, [password])

    return (
        <div className='flex flex-col gap-2'>
            <div id='meter-container' className='w-full bg-gray-300 border rounded-full h-3 border-black shadow-md'>
                <div className={`${barColor} ${barWidth} h-full transition ease-in-out delay-150 rounded-full`}>
                </div>
            </div>
            <div id='warning' className='py-2 flex flex-col items-center border border-black bg-white opacity-45 rounded-xl font-poppins text-base'>
                <div className={`${hasLength() ? 'text-green-700' : 'text-red-500'} transition-color duration-500`}>
                    {hasLength() ? '✓ ' : '✗ '}
                    At least <strong>8 characters</strong>
                </div>
                <div className={`${hasLowerCase() ? 'text-green-700' : 'text-red-500'} transition-color duration-500`}>
                    {hasLowerCase() ? '✓ ' : '✗ '}
                    At least <strong>one lowercase letter</strong>
                </div>
                <div className={`${hasUpperCase() ? 'text-green-700' : 'text-red-500'} transition-color duration-500`}>
                    {hasUpperCase() ? '✓ ' : '✗ '}
                    At least <strong>one uppercase letter</strong>
                </div>
                <div className={`${hasNumber() ? 'text-green-700' : 'text-red-500'} transition-color duration-500`}>
                    {hasNumber() ? '✓ ' : '✗ '}
                    At least <strong>one number</strong>
                </div>
                <div className={`${hasSpecialChar() ? 'text-green-700' : 'text-red-500'} transition-color duration-500`}>
                    {hasSpecialChar() ? '✓ ' : '✗ '}
                    At least <strong>one special character</strong>
                </div>
            </div>
        </div>
    )
}

export default PasswordStrengthMeter