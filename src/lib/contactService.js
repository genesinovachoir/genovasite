import { supabase } from './supabaseClient';

export async function submitContactMessage({
    name,
    email,
    subject,
    message
}) {

    if (!name || !email || !message) {
        return { success: false, error: 'Missing required fields' };
    }

    try {

        const { error } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name,
                    email,
                    subject,
                    message
                }
            ]);

        if (error) {
            console.error('Contact insert error:', error);
            return { success: false, error };
        }

        return { success: true };

    } catch (err) {
        console.error('Unexpected contact error:', err);
        return { success: false, error: err };
    }
}
