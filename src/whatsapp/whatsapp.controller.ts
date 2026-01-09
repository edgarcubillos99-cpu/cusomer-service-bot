import { Controller, Get, Post, Query, Body } from '@nestjs/common';

@Controller('whatsapp/webhook')
export class WhatsappController {
  // 1. Este método es solo para que Meta verifique que el server existe
  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    const MY_VERIFY_TOKEN = 'mi_clave_secreta_123'; // Tú inventas esta clave

    if (mode === 'subscribe' && token === MY_VERIFY_TOKEN) {
      return challenge;
    }
    return 'Error de verificación';
  }

  // 2. Este método recibirá los mensajes reales de los clientes
  @Post()
  receiveMessage(@Body() body: any) {
    console.log(
      '¡Llegó un mensaje desde WhatsApp!',
      JSON.stringify(body, null, 2),
    );
    return { status: 'RECEIVED' };
  }
}
