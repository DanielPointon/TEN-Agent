import Avatar from "../rtc/avatar";
import Description from "../description";
import Rtc from "../rtc";
import Header from "../header";
import { rtcManager, IRtcUser } from "@/manager";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Chat from "../chat";
import PropertyList from "../components/PropertyListing";
import { StarFilled } from "@ant-design/icons";

let hasInit = false;

const PCEntry = () => {
  const [remoteuser, setRemoteUser] = useState<IRtcUser>();

  useEffect(() => {
    if (hasInit) {
      return;
    }

    init();

    return () => {
      if (hasInit) {
        destory();
      }
    };
  });

  const onRemoteUserChanged = (user: IRtcUser) => {
    setRemoteUser(user);
  };

  const init = async () => {
    rtcManager.on("remoteUserChanged", onRemoteUserChanged);
    hasInit = true;
  };

  const destory = async () => {
    rtcManager.off("remoteUserChanged", onRemoteUserChanged);
    hasInit = false;
  };

  return (
    <div className={styles.entry}>
      {/* <Header /> */}
      <div className={styles.content}>
        <Description />
        <div className={styles.body} style={{ display: "flex", height: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Chat />
            <Rtc />
          </div>
          <div className={styles.flexBox}>
            <div
              style={{
                marginLeft: "auto",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar audioTrack={remoteuser?.audioTrack} />
              <div className={styles.agentInfo}>
                <div className={styles.agentName}>Agent: Lora</div>
                <div className={styles.agentRatings}>
                  <StarFilled className={styles.star} />
                  <StarFilled className={styles.star} />
                  <StarFilled className={styles.star} />
                  <StarFilled className={styles.star} />
                  <StarFilled className={styles.star} />
                </div>
              </div>
            </div>
            <div className={styles.propertyList}>
              <PropertyList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCEntry;