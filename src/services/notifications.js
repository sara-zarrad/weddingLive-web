import emailjs from '@emailjs/browser';

export const sendAdminNotification = async (user) => {
  const serviceId = 'weddingLive-accept-admin';
  const templateId = 'template_tsarujm';
  const publicKey = 'K5BPzov2cfKfwnU_u';

  const templateParams = {
    user_name: user.displayName,
    user_email: user.email,
    user_id: user.uid,
    admin_email: 'sarra.zarrad23@gmail.com' // Ton mail pour recevoir l'alerte
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("Mail de notification envoyé au vidéaste !");
  } catch (error) {
    console.error("Erreur envoi mail:", error);
  }
};