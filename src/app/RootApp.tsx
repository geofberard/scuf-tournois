import * as React from 'react';
import {FC, useEffect} from 'react';

const driveKey = "1NsncYC4vb-eO84Ucc8ohnsBBxVocwoAxe5F1AnePU6I" // "1qJoXQP4ECRrhydxb76WmtPMQbjDDe4ccM-xtJZ3ZNPU";

const getQuestionLoader = () => ({
    load : () => {
        // @ts-ignore
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/" + driveKey + "/gviz/tq?headers=1");
        query.send((response) => {
            var driveData = response.getDataTable();
            var driveQuestions = [];
            for (var i = 0; i < driveData.getNumberOfRows(); i++) {
                driveQuestions.push({id: i + 1, label: driveData.getValue(i, 1)});
            }
            console.log("data",driveQuestions);
        });
    }
});

let flag = true;

export const RootApp: FC = () => {

    if(flag){
        const questionLoaderTemp = (getQuestionLoader());
        // @ts-ignore
        google.load('visualization', '1.0', {'packages': ['controls', 'corechart', 'table']});

        // @ts-ignore
        google.setOnLoadCallback( () => {
            questionLoaderTemp.load();
            setInterval(questionLoaderTemp.load, 5000);
        });
        flag = false;

        // enableKeyboardManagement();
    }

    useEffect(() => {
        // @ts-ignore
        // google.load('visualization', '1.0', {'packages': ['controls', 'corechart', 'table']});

        // @ts-ignore
        // google.setOnLoadCallback( () => {
        //     // questionLoaderTemp.load();
        //     // setInterval(questionLoaderTemp.load, 5000);
        // });
    },[]);

    return (
        <div>Hello World !</div>
    )
}