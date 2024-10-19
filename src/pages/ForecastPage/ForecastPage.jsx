import React, { useState } from "react";
import Header from "../../components/Header/Header";
import DetailedDailyForecastBlock from "../../components/DetailedDailyForecastBlock/DetailedDailyForecastBlock.jsx";
import styles from "./ForecastPage.module.css";

const ForecastPage = () => {

    return(
        <div>
            <Header></Header>
            <div className={styles["content-container"]}>
                <DetailedDailyForecastBlock></DetailedDailyForecastBlock>
            </div>

        </div>

    )
}

export default ForecastPage;