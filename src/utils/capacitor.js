import { Capacitor } from '@capacitor/core';

export function isNativeApp() {
  return Capacitor.isNativePlatform();
}

export function getPlatform() {
  return Capacitor.getPlatform();
}

export async function requestNotificationPermission() {
  if (!isNativeApp()) return true;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    const perm = await LocalNotifications.requestPermissions();
    return perm.display === 'granted';
  } catch { return false; }
}

export async function sendLocalNotification(title, body) {
  if (!isNativeApp()) return;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.schedule({
      notifications: [{
        title, body, id: Date.now(),
        smallIcon: 'ic_stat_icon_config_sample',
        largeIcon: 'favicon.svg',
      }],
    });
  } catch {}
}

export async function takePicture() {
  if (!isNativeApp()) return null;
  try {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
    const photo = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    return photo.dataUrl;
  } catch { return null; }
}

export async function pickFromGallery() {
  if (!isNativeApp()) return null;
  try {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
    const photo = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    return photo.dataUrl;
  } catch { return null; }
}

export async function shareContent(title, text, url) {
  if (isNativeApp()) {
    try {
      const { Share } = await import('@capacitor/share');
      await Share.share({ title, text, url });
    } catch {}
  } else if (navigator.share) {
    await navigator.share({ title, text, url });
  } else {
    await navigator.clipboard.writeText(url);
  }
}

export function addMobileBackButtonListener(onBack) {
  if (!isNativeApp()) return;
  window.addEventListener('popstate', (e) => {
    e.preventDefault();
    onBack();
  });
}
