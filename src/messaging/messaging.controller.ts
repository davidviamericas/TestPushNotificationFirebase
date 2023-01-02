import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { getMessaging } from "firebase-admin/messaging";

@Controller('messaging')
export class MessagingController {

    @Get(':token')
    sendNotification(@Param('token') token: string): string {
        // This registration token comes from the client FCM SDKs.
        const message = {
            data: {
                url: '/offers'
            },
            notification: {
                "title": "50% offer for T shirts",
                "body" : "Get extra 10% on your first order. Hurry! offer expires in 2 hours"
            },
            token: token
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        /*try{
            const response = await getMessaging().send(message);
            console.log('Successfully sent message:', response);
            return `Successfully sent message: ${response}`
        }
        catch(error){
            console.log('Error sending message:', error);
            return `Error sending message: ${error}`
        }*/
        getMessaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });

        return "OK";
    }
}
