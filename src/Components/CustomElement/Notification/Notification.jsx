import React, { useCallback, useEffect, useState } from 'react'
import { NotificationState } from '../../../SharedStates/NotificationState'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import Success from './Success'
import Error from './Error'

const Notification = React.memo(() => {

    const notification = useRecoilValue(NotificationState)
    const resetNotification = useResetRecoilState(NotificationState)
    const [displayNotification, setDisplayNotification] = useState(true)

    var timeOutForwordPropagation
    var timeOutBackPropagation

    const closeNotification = useCallback(() => {
        clearTimeout(timeOutForwordPropagation)
        clearTimeout(timeOutBackPropagation)
        resetNotification()
        setDisplayNotification(true)
    }, [timeOutForwordPropagation, timeOutBackPropagation])


    useEffect(() => {
        if (notification?.type) {
            new Promise((resolve, reject) => {
                try {
                    timeOutForwordPropagation = setTimeout(() => {
                        setDisplayNotification(false)
                        resolve()
                    }, 5700)
                } catch (e) {
                    reject(e)
                }
            }).then(() => {
                timeOutBackPropagation = setTimeout(() => {
                    resetNotification()
                    setDisplayNotification(true)
                }, 800)
            }).catch((error) => {
                console.log(error)
            })

            return () => {
                clearTimeout(timeOutForwordPropagation)
                clearTimeout(timeOutBackPropagation)
            }
        }
    }, [notification.type])

    if (notification?.type === "error")
        return (
            <Error closeNotification={closeNotification} displayNotification={displayNotification} message={notification?.message} />
        )
    else if (notification?.type === "warning")
        return (<div className=''>
            <p className=''>{notification?.message}</p>
        </div>)
    else if (notification?.type === "info")
        return <div className=''>
            <p className=''>{notification?.message}</p>
        </div>
    else if (notification?.type === "success")
        return <Success closeNotification={closeNotification}
            displayNotification={displayNotification} message={notification?.message} />

    else
        return <div></div>
})


export default Notification