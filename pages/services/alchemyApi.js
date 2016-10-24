/**
 * Created by gooba on 24/10/2016.
 */

//Some constants
const API_KEY = "9541481794480afe68df1285e67824421ae9cdcb";
const BASE_URI = `http://gateway-a.watsonplatform.net/calls/text/`;
const EMOTION_PATH = `TextGetEmotion?apikey=${API_KEY}&outputMode=json&showSourceText=1&text=`;

/**
 * Simple helper function to call the Alchemy API
 * Note that it uses the fabled async/await rather then promises that
 * are far more common. It makes the code far more readable.
 *
 * @param text
 * @returns {*}
 */
exports.getEmotionAnalysis = async function (text) {

    let url = `${BASE_URI}${EMOTION_PATH}${encodeURIComponent(text)}`;

    try {
        let response = await fetch(url);
        let json = await response.json();
        console.log(`json response from alchemy = ${JSON.stringify(json, null, 4)}`);
        return json;
    }
    catch(e) {
        console.log(`Error calling alchemy emotion api: ${e.message}`);
        return e.message;
    }
};

