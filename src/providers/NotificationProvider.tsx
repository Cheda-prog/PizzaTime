import { registerForPushNotificationsAsync } from "@/src/lib/notifications";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProviders";
import * as Notifications from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();

  const { profile } = useAuth();

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  const savePushToken = async (newToken?: string) => {
    if (!newToken) return;
    if (!profile?.id) return; // ← THIS LINE FIXES THE CRASH

    setExpoPushToken(newToken);

    await supabase
      .from("profiles")
      .update({ expo_push_token: newToken })
      .eq("id", profile.id);
  };

  useEffect(() => {
    if (!profile?.id) return;

    registerForPushNotificationsAsync().then(savePushToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener(setNotification);

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(console.log);

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [profile?.id]);

  return <>{children}</>;
};

export default NotificationProvider;
