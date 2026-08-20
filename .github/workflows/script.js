// Ensure everything runs only after the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // State variables
    let currentLang = "en";
    let currentRecommendedCrop = null;
    let currentHighestScore = 0;

    // Full Localization Dictionary
    const i18n = {
        en: {
            logoText: "🌱 FarmEasy", navHome: "Home", navRecommend: "Recommendation", navCrops: "Crops", navAbout: "About",
            tagSmart: "SMART FARMING WITH AI", heroTitle: "AI-Based Crop Recommendation", heroSpan: "for Farmers",
            heroDesc: "Enter your soil and weather details to get a smart crop recommendation.",
            btnStart: "Get Started →", supportedCropsCount: "10 Supported Crops",
            tagFarm: "FARM DETAILS", formTitle: "Get Your Crop Recommendation", formDesc: "Enter soil and weather details below.",
            labelN: "Nitrogen (N)", labelP: "Phosphorus (P)", labelK: "Potassium (K)",
            labelPh: "Soil pH", labelTemp: "Temperature (°C)", labelRain: "Rainfall (mm)",
            btnRecommend: "✨ Get AI Recommendation", btnReset: "Reset",
            resultLabel: "RECOMMENDED CROP", tagSupported: "SUPPORTED CROPS", cropsTitle: "Our 10 Crops",
            feat1Title: "Soil Analysis", feat1Desc: "Uses Nitrogen, Phosphorus, Potassium and soil pH.",
            feat2Title: "Weather Analysis", feat2Desc: "Uses temperature and rainfall values.",
            feat3Title: "Smart Recommendation", feat3Desc: "Compares all 10 crops and recommends the best match.",
            footerDesc: "AI-Based Crop Recommendation for Farmers", footerSub: "Frontend Prototype",
            scoreText: "Suitability Score: ",
            
            cropRagi: "Ragi", cropJowar: "Jowar", cropCoffee: "Coffee", cropBanana: "Banana", cropRice: "Rice",
            cropMaize: "Maize", cropWheat: "Wheat", cropGroundnut: "Groundnut", cropPotato: "Potato", cropChickpea: "Chickpea",
            
            reasonRagi: "Warm temperature, moderate rainfall, and suitable soil conditions make Ragi the best match.",
            reasonJowar: "Warm climate and moderate rainfall make Jowar the best match.",
            reasonCoffee: "Suitable temperature, good rainfall, and slightly acidic soil make Coffee the best match.",
            reasonBanana: "Warm temperature, sufficient rainfall, and nutrient conditions make Banana the best match.",
            reasonRice: "High rainfall, warm temperature, and suitable soil conditions make Rice the best match.",
            reasonMaize: "The entered temperature, rainfall, and soil conditions are highly suitable for Maize.",
            reasonWheat: "Cooler temperature and suitable soil conditions make Wheat the best match.",
            reasonGroundnut: "Warm conditions and moderate rainfall make Groundnut the best match.",
            reasonPotato: "Cooler temperature and suitable soil pH make Potato the best match.",
            reasonChickpea: "Moderate temperature, lower rainfall, and suitable soil conditions make Chickpea the best match."
        },
        ta: {
            logoText: "🌱 ஃபார்ம் ஈஸி", navHome: "முகப்பு", navRecommend: "பரிந்துரை", navCrops: "பயிர்கள்", navAbout: "பற்றி",
            tagSmart: "AI உடன் ஸ்மார்ட் விவசாயம்", heroTitle: "AI அடிப்படையிலான பயிர் பரிந்துரை", heroSpan: "விவசாயிகளுக்கு",
            heroDesc: "ஸ்மார்ட் பயிர் பரிந்துரையைப் பெற உங்கள் மண் மற்றும் வானிலை விவரங்களை உள்ளிடவும்.",
            btnStart: "தொடங்கவும் →", supportedCropsCount: "10 ஆதரிக்கப்படும் பயிர்கள்",
            tagFarm: "பண்ணை விவரங்கள்", formTitle: "உங்கள் பயிர் பரிந்துரையைப் பெறுங்கள்", formDesc: "கீழே மண் மற்றும் வானிலை விவரங்களை உள்ளிடவும்.",
            labelN: "நைட்ரஜன் (N)", labelP: "பாஸ்பரஸ் (P)", labelK: "பொட்டாசியம் (K)",
            labelPh: "மண் pH", labelTemp: "வெப்பநிலை (°C)", labelRain: "மழையளவு (mm)",
            btnRecommend: "✨ AI பரிந்துரையைப் பெறுங்கள்", btnReset: "மீட்டமை",
            resultLabel: "பரிந்துரைக்கப்படும் பயிர்", tagSupported: "ஆதரிக்கப்படும் பயிர்கள்", cropsTitle: "எங்கள் 10 பயிர்கள்",
            feat1Title: "மண் பகுப்பாய்வு", feat1Desc: "நைட்ரஜன், பாஸ்பரஸ், பொட்டாசியம் மற்றும் மண் pH ஐப் பயன்படுத்துகிறது.",
            feat2Title: "வானிலை பகுப்பாய்வு", feat2Desc: "வெப்பநிலை மற்றும் மழையளவு மதிப்புகளைப் பயன்படுத்துகிறது.",
            feat3Title: "ஸ்மார்ட் பரிந்துரை", feat3Desc: "அனைத்து 10 பயிர்களையும் ஒப்பிட்டு சிறந்ததை பரிந்துரைக்கிறது.",
            footerDesc: "விவசாயிகளுக்கான AI அடிப்படையிலான பயிர் பரிந்துரை", footerSub: "முன்பக்க மாதிரி",
            scoreText: "பொருத்தமான மதிப்பெண்: ",
            
            cropRagi: "கேழ்வரகு", cropJowar: "சோளம்", cropCoffee: "காபி", cropBanana: "வாழை", cropRice: "நெல்",
            cropMaize: "மக்காச்சோளம்", cropWheat: "கோதுமை", cropGroundnut: "நிலக்கடலை", cropPotato: "உருளைக்கிழங்கு", cropChickpea: "கொண்டைக்கடலை",
            
            reasonRagi: "வெதுவெதுப்பான வெப்பநிலை, மிதமான மழை மற்றும் பொருத்தமான மண் நிலைமைகள் கேழ்வரகுக்கு சிறந்தவை.",
            reasonJowar: "வெதுவெதுப்பான காலநிலை மற்றும் மிதமான மழை சோளத்திற்கு சிறந்தவை.",
            reasonCoffee: "பொருத்தமான வெப்பநிலை, நல்ல மழை மற்றும் சற்று அமிலத்தன்மை கொண்ட மண் காபிக்கு சிறந்தவை.",
            reasonBanana: "வெதுவெதுப்பான வெப்பநிலை, போதுமான மழை மற்றும் ஊட்டச்சத்து நிலைமைகள் வாழைக்கு சிறந்தவை.",
            reasonRice: "அதிக மழை, வெதுவெதுப்பான வெப்பநிலை மற்றும் பொருத்தமான மண் நிலைமைகள் நெல்லுக்கு சிறந்தவை.",
            reasonMaize: "உள்ளிட்ட வெப்பநிலை, மழை மற்றும் மண் நிலைமைகள் மக்காச்சோளத்திற்கு மிகவும் பொருத்தமானவை.",
            reasonWheat: "குளிர்ந்த வெப்பநிலை மற்றும் பொருத்தமான மண் நிலைமைகள் கோதுமைக்கு சிறந்தவை.",
            reasonGroundnut: "வெதுவெதுப்பான நிலைமைகள் மற்றும் மிதமான மழை நிலக்கடலைக்கு சிறந்தவை.",
            reasonPotato: "குளிர்ந்த வெப்பநிலை மற்றும் பொருத்தமான மண் pH உருளைக்கிழங்குக்கு சிறந்தவை.",
            reasonChickpea: "மிதமான வெப்பநிலை, குறைந்த மழை மற்றும் பொருத்தமான மண் நிலைமைகள் கொண்டைக்கடலைக்கு சிறந்தவை."
        },
        kn: {
            logoText: "🌱 ಫಾರ್ಮ್‌ಈಸಿ", navHome: "ಮುಖಪುಟ", navRecommend: "ಶಿಫಾರಸು", navCrops: "ಬೆಳೆಗಳು", navAbout: "ಬಗ್ಗೆ",
            tagSmart: "AI ಯೊಂದಿಗೆ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ", heroTitle: "AI ಆಧಾರಿತ ಬೆಳೆ ಶಿಫಾರಸು", heroSpan: "ರೈತರಿಗಾಗಿ",
            heroDesc: "ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಲು ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
            btnStart: "ಪ್ರಾರಂಭಿಸಿ →", supportedCropsCount: "10 ಬೆಂಬಲಿತ ಬೆಳೆಗಳು",
            tagFarm: "ಕೃಷಿ ವಿವರಗಳು", formTitle: "ನಿಮ್ಮ ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಿರಿ", formDesc: "ಕೆಳಗೆ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
            labelN: "ಸಾರಜನಕ (N)", labelP: "ರಂಜಕ (P)", labelK: "ಪೊಟ್ಯಾಸಿಯಮ್ (K)",
            labelPh: "ಮಣ್ಣಿನ pH", labelTemp: "ತಾಪಮಾನ (°C)", labelRain: "ಮಳೆ (mm)",
            btnRecommend: "✨ AI ಶಿಫಾರಸು ಪಡೆಯಿರಿ", btnReset: "ಮರುಹೊಂದಿಸಿ",
            resultLabel: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ", tagSupported: "ಬೆಂಬಲಿತ ಬೆಳೆಗಳು", cropsTitle: "ನಮ್ಮ 10 ಬೆಳೆಗಳು",
            feat1Title: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ", feat1Desc: "ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಸಿಯಮ್ ಮತ್ತು ಮಣ್ಣಿನ pH ಬಳಸುತ್ತದೆ.",
            feat2Title: "ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ", feat2Desc: "ತಾಪಮಾನ ಮತ್ತು ಮಳೆಯ ಮೌಲ್ಯಗಳನ್ನು ಬಳಸುತ್ತದೆ.",
            feat3Title: "ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸು", feat3Desc: "ಎಲ್ಲಾ 10 ಬೆಳೆಗಳನ್ನು ಹೋಲಿಸುತ್ತದೆ ಮತ್ತು ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ.",
            footerDesc: "ರೈತರಿಗಾಗಿ AI ಆಧಾರಿತ ಬೆಳೆ ಶಿಫಾರಸು", footerSub: "ಫ್ರಂಟ್-ಎಂಡ್ ಮಾದರಿ",
            scoreText: "ಸೂಕ್ತತೆಯ ಸ್ಕೋರ್: ",
            
            cropRagi: "ರಾಗಿ", cropJowar: "ಜೋಳ", cropCoffee: "ಕಾಫಿ", cropBanana: "ಬಾಳೆಹಣ್ಣು", cropRice: "ಭತ್ತ",
            cropMaize: "ಮೆಕ್ಕೆಜೋಳ", cropWheat: "ಗೋಧಿ", cropGroundnut: "ಕಡಲೆಕಾಯಿ", cropPotato: "ಆಲೂಗಡ್ಡೆ", cropChickpea: "ಕಡಲೆ",
            
            reasonRagi: "ಬೆಚ್ಚಗಿನ ತಾಪಮಾನ, ಸಾಧಾರಣ ಮಳೆ ಮತ್ತು ಸೂಕ್ತವಾದ ಮಣ್ಣು ರಾಗಿಯನ್ನು ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆಯನ್ನಾಗಿ ಮಾಡುತ್ತದೆ.",
            reasonJowar: "ಬೆಚ್ಚಗಿನ ವಾತಾವರಣ ಮತ್ತು ಸಾಧಾರಣ ಮಳೆ ಜೋಳಕ್ಕೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.",
            reasonCoffee: "ಸೂಕ್ತವಾದ ತಾಪಮಾನ, ಉತ್ತಮ ಮಳೆ ಮತ್ತು ಆಮ್ಲೀಯ ಮಣ್ಣು ಕಾಫಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.",
            reasonBanana: "ಬೆಚ್ಚಗಿನ ತಾಪಮಾನ ಮತ್ತು ಸಾಕಷ್ಟು ಮಳೆ ಬಾಳೆಹಣ್ಣಿಗೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.",
            reasonRice: "ಹೆಚ್ಚಿನ ಮಳೆ, ಬೆಚ್ಚಗಿನ ತಾಪಮಾನ ಭತ್ತಕ್ಕೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.",
            reasonMaize: "ನೀವು ನಮೂದಿಸಿದ ವಿವರಗಳು ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ಅತ್ಯಂತ ಸೂಕ್ತವಾಗಿವೆ.",
            reasonWheat: "ತಂಪಾದ ತಾಪಮಾನ ಮತ್ತು ಸೂಕ್ತವಾದ ಮಣ್ಣು ಗೋಧಿಗೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.",
            reasonGroundnut: "ಬೆಚ್ಚಗಿನ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ಸಾಧಾರಣ ಮಳೆ ಕಡಲೆಕಾಯಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.",
            reasonPotato: "ತಂಪಾದ ತಾಪಮಾನ ಮತ್ತು ಸೂಕ್ತವಾದ ಮಣ್ಣಿನ pH ಆಲೂಗಡ್ಡೆಗೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.",
            reasonChickpea: "ಮಧ್ಯಮ ತಾಪಮಾನ, ಕಡಿಮೆ ಮಳೆ ಕಡಲೆಗೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ."
        },
        te: {
            logoText: "🌱 ఫార్మ్ ఈజీ", navHome: "హోమ్", navRecommend: "సిఫార్సు", navCrops: "పంటలు", navAbout: "గురించి",
            tagSmart: "AI తో స్మార్ట్ వ్యవసాయం", heroTitle: "AI ఆధారిత పంట సిఫార్సు", heroSpan: "రైతుల కోసం",
            heroDesc: "స్మార్ట్ పంట సిఫార్సు పొందడానికి మీ నేల మరియు వాతావరణ వివరాలను నమోదు చేయండి.",
            btnStart: "ప్రారంభించండి →", supportedCropsCount: "10 మద్దతు ఉన్న పంటలు",
            tagFarm: "వ్యవసాయ వివరాలు", formTitle: "మీ పంట సిఫార్సు పొందండి", formDesc: "క్రింద నేల మరియు వాతావరణ వివరాలను నమోదు చేయండి.",
            labelN: "నత్రజని (N)", labelP: "భాస్వరం (P)", labelK: "పొటాషియం (K)",
            labelPh: "నేల pH", labelTemp: "ఉష్ణోగ్రత (°C)", labelRain: "వర్షపాతం (mm)",
            btnRecommend: "✨ AI సిఫార్సు పొందండి", btnReset: "రీసెట్",
            resultLabel: "సిఫార్సు చేయబడిన పంట", tagSupported: "మద్దతు ఉన్న పంటలు", cropsTitle: "మా 10 పంటలు",
            feat1Title: "నేల విశ్లేషణ", feat1Desc: "నత్రజని, భాస్వరం, పొటాషియం మరియు నేల pH ని ఉపయోగిస్తుంది.",
            feat2Title: "వాతావరణ విశ్లేషణ", feat2Desc: "ఉష్ణోగ్రత మరియు వర్షపాతం విలువలను ఉపయోగిస్తుంది.",
            feat3Title: "స్మార్ట్ సిఫార్సు", feat3Desc: "అన్ని 10 పంటలను పోల్చి మరియు ఉత్తమ సరిపోలికను సిఫార్సు చేస్తుంది.",
            footerDesc: "రైతుల కోసం AI ఆధారిత పంట సిఫార్సు", footerSub: "ఫ్రంటెండ్ నమూనా",
            scoreText: "అనుకూలత స్కోర్: ",
            
            cropRagi: "రాగి", cropJowar: "జొన్న", cropCoffee: "కాఫీ", cropBanana: "అరటి", cropRice: "వరి",
            cropMaize: "మొక్కజొన్న", cropWheat: "గోధుమ", cropGroundnut: "వేరుశెనగ", cropPotato: "బంగాళాదుంప", cropChickpea: "శనగలు",
            
            reasonRagi: "వెచ్చని ఉష్ణోగ్రత, మోస్తరు వర్షపాతం మరియు అనుకూలమైన నేల రాగికి ఉత్తమ ఎంపిక.",
            reasonJowar: "వెచ్చని వాతావరణం మరియు మోస్తరు వర్షపాతం జొన్నకు అనుకూలం.",
            reasonCoffee: "తగిన ఉష్ణోగ్రత, మంచి వర్షపాతం మరియు ఆమ్ల నేల కాఫీకి ఉత్తమం.",
            reasonBanana: "వెచ్చని ఉష్ణోగ్రత మరియు తగినంత వర్షపాతం అరటికి అనుకూలం.",
            reasonRice: "అధిక వర్షపాతం, వెచ్చని ఉష్ణోగ్రత వరికి ఉత్తమం.",
            reasonMaize: "మీరు నమోదు చేసిన వివరాలు మొక్కజొన్నకు బాగా సరిపోతాయి.",
            reasonWheat: "చల్లని ఉష్ణోగ్రత మరియు అనుకూలమైన నేల గోధుమకు ఉత్తమం.",
            reasonGroundnut: "వెచ్చని పరిస్థితులు మరియు మోస్తరు వర్షపాతం వేరుశెనగకు అనుకూలం.",
            reasonPotato: "చల్లని ఉష్ణోగ్రత మరియు తగిన నేల pH బంగాళాదుంపకు ఉత్తమం.",
            reasonChickpea: "మితమైన ఉష్ణోగ్రత, తక్కువ వర్షపాతం శనగలకు ఉత్తమం."
        },
        ml: {
            logoText: "🌱 ഫാംഈസി", navHome: "ഹോം", navRecommend: "ശുപാർശ", navCrops: "വിളകൾ", navAbout: "കുറിച്ച്",
            tagSmart: "AI ഉള്ള സ്മാർട്ട് കൃഷി", heroTitle: "AI അടിസ്ഥാനമാക്കിയുള്ള വിള ശുപാർശ", heroSpan: "കർഷകർക്കായി",
            heroDesc: "മികച്ച വിള ശുപാർശ ലഭിക്കുന്നതിന് നിങ്ങളുടെ മണ്ണിന്റെയും കാലാവസ്ഥയുടെയും വിശദാംശങ്ങൾ നൽകുക.",
            btnStart: "ആരംഭിക്കുക →", supportedCropsCount: "10 പിന്തുണയ്ക്കുന്ന വിളകൾ",
            tagFarm: "ഫാം വിശദാംശങ്ങൾ", formTitle: "നിങ്ങളുടെ വിള ശുപാർശ നേടുക", formDesc: "താഴെ മണ്ണിന്റെയും കാലാവസ്ഥയുടെയും വിശദാംശങ്ങൾ നൽകുക.",
            labelN: "നൈട്രജൻ (N)", labelP: "ഫോസ്ഫറസ് (P)", labelK: "പൊട്ടാസ്യം (K)",
            labelPh: "മണ്ണിന്റെ pH", labelTemp: "താപനില (°C)", labelRain: "മഴ (mm)",
            btnRecommend: "✨ AI ശുപാർശ നേടുക", btnReset: "പുനഃസജ്ജമാക്കുക",
            resultLabel: "ശുപാർശ ചെയ്യുന്ന വിള", tagSupported: "പിന്തുണയ്ക്കുന്ന വിളകൾ", cropsTitle: "ഞങ്ങളുടെ 10 വിളകൾ",
            feat1Title: "മണ്ണ് പരിശോധന", feat1Desc: "നൈട്രജൻ, ഫോസ്ഫറസ്, പൊട്ടാസ്യം, മണ്ണിന്റെ pH എന്നിവ ഉപയോഗിക്കുന്നു.",
            feat2Title: "കാലാവസ്ഥാ വിശകലനം", feat2Desc: "താപനിലയും മഴയുടെ മൂല്യങ്ങളും ഉപയോഗിക്കുന്നു.",
            feat3Title: "സ്മാർട്ട് ശുപാർശ", feat3Desc: "എല്ലാ 10 വിളകളും താരതമ്യം ചെയ്ത് മികച്ച പൊരുത്തം ശുപാർശ ചെയ്യുന്നു.",
            footerDesc: "കർഷകർക്കായി AI അടിസ്ഥാനമാക്കിയുള്ള വിള ശുപാർശ", footerSub: "ഫ്രണ്ട്-എൻഡ് പ്രോട്ടോടൈപ്പ്",
            scoreText: "അനുയോജ്യത സ്കോർ: ",
            
            cropRagi: "റാഗി", cropJowar: "ജോവർ", cropCoffee: "കാപ്പി", cropBanana: "വാഴപ്പഴം", cropRice: "നെല്ല്",
            cropMaize: "ചോളം", cropWheat: "ഗോതമ്പ്", cropGroundnut: "നിലക്കടല", cropPotato: "ഉരുളക്കിഴങ്ങ്", cropChickpea: "കടല",
            
            reasonRagi: "ചൂടുള്ള താപനിലയും മിതമായ മഴയും റാഗിയെ മികച്ച തിരഞ്ഞെടുപ്പാക്കുന്നു.",
            reasonJowar: "ചൂടുള്ള കാലാവസ്ഥയും മിതമായ മഴയും ജോവറിന് അനുയോജ്യമാണ്.",
            reasonCoffee: "അനുയോജ്യമായ താപനിലയും നല്ല മഴയും കാപ്പിക്ക് മികച്ചതാണ്.",
            reasonBanana: "ചൂടുള്ള താപനിലയും മതിയായ മഴയും വാഴപ്പഴത്തിന് അനുയോജ്യമാണ്.",
            reasonRice: "ഉയർന്ന മഴയും ചൂടുള്ള താപനിലയും നെല്ലിന് മികച്ചതാണ്.",
            reasonMaize: "നൽകിയിരിക്കുന്ന വിവരങ്ങൾ ചോളത്തിന് തികച്ചും അനുയോജ്യമാണ്.",
            reasonWheat: "തണുത്ത താപനിലയും അനുയോജ്യമായ മണ്ണും ഗോതമ്പിന് മികച്ചതാണ്.",
            reasonGroundnut: "ചൂടുള്ള സാഹചര്യങ്ങളും മിതമായ മഴയും നിലക്കടലയ്ക്ക് അനുയോജ്യമാണ്.",
            reasonPotato: "തണുത്ത താപനിലയും അനുയോജ്യമായ മണ്ണും ഉരുളക്കിഴങ്ങിന് മികച്ചതാണ്.",
            reasonChickpea: "മിതമായ താപനിലയും കുറഞ്ഞ മഴയും കടലയ്ക്ക് അനുയോജ്യമാണ്."
        },
        hi: {
            logoText: "🌱 फार्मईजी", navHome: "होम", navRecommend: "सिफारिश", navCrops: "फसलें", navAbout: "बारे में",
            tagSmart: "एआई के साथ स्मार्ट खेती", heroTitle: "एआई आधारित फसल सिफारिश", heroSpan: "किसानों के लिए",
            heroDesc: "स्मार्ट फसल सिफारिश पाने के लिए अपनी मिट्टी और मौसम का विवरण दर्ज करें।",
            btnStart: "शुरू करें →", supportedCropsCount: "10 समर्थित फसलें",
            tagFarm: "खेत का विवरण", formTitle: "अपनी फसल सिफारिश प्राप्त करें", formDesc: "नीचे मिट्टी और मौसम का विवरण दर्ज करें।",
            labelN: "नाइट्रोजन (N)", labelP: "फास्फोरस (P)", labelK: "पोटेशियम (K)",
            labelPh: "मिट्टी का पीएच", labelTemp: "तापमान (°C)", labelRain: "वर्षा (mm)",
            btnRecommend: "✨ एआई सिफारिश प्राप्त करें", btnReset: "रीसेट",
            resultLabel: "अनुशंसित फसल", tagSupported: "समर्थित फसलें", cropsTitle: "हमारी 10 फसलें",
            feat1Title: "मिट्टी विश्लेषण", feat1Desc: "नाइट्रोजन, फास्फोरस, पोटेशियम और मिट्टी के पीएच का उपयोग करता है।",
            feat2Title: "मौसम विश्लेषण", feat2Desc: "तापमान और वर्षा मूल्यों का उपयोग करता है।",
            feat3Title: "स्मार्ट सिफारिश", feat3Desc: "सभी 10 फसलों की तुलना करता है और सबसे अच्छे मिलान की सिफारिश करता है।",
            footerDesc: "किसानों के लिए एआई आधारित फसल सिफारिश", footerSub: "फ्रंटएंड प्रोटोटाइप",
            scoreText: "उपयुक्तता स्कोर: ",
            
            cropRagi: "रागी", cropJowar: "ज्वार", cropCoffee: "कॉफ़ी", cropBanana: "केला", cropRice: "चावल",
            cropMaize: "मक्का", cropWheat: "गेहूं", cropGroundnut: "मूंगफली", cropPotato: "आलू", cropChickpea: "चना",
            
            reasonRagi: "गर्म तापमान, मध्यम वर्षा और उपयुक्त मिट्टी रागी को सबसे अच्छा विकल्प बनाती है।",
            reasonJowar: "गर्म जलवायु और मध्यम वर्षा ज्वार के लिए सबसे अच्छी है।",
            reasonCoffee: "उपयुक्त तापमान, अच्छी वर्षा और थोड़ी अम्लीय मिट्टी कॉफ़ी के लिए सर्वोत्तम है।",
            reasonBanana: "गर्म तापमान, पर्याप्त वर्षा केले के लिए उपयुक्त है।",
            reasonRice: "अधिक वर्षा, गर्म तापमान चावल के लिए सबसे अच्छा है।",
            reasonMaize: "दर्ज किया गया विवरण मक्के के लिए अत्यधिक उपयुक्त है।",
            reasonWheat: "ठंडा तापमान और उपयुक्त मिट्टी गेहूं के लिए सबसे अच्छी है।",
            reasonGroundnut: "गर्म स्थिति और मध्यम वर्षा मूंगफली के लिए उपयुक्त है।",
            reasonPotato: "ठंडा तापमान और उपयुक्त मिट्टी का पीएच आलू के लिए सबसे अच्छा है।",
            reasonChickpea: "मध्यम तापमान, कम वर्षा चने के लिए उपयुक्त है।"
        }
    };

    const icons = { Ragi: "🌾", Jowar: "🌾", Coffee: "☕", Banana: "🍌", Rice: "🌾", Maize: "🌽", Wheat: "🌾", Groundnut: "🥜", Potato: "🥔", Chickpea: "🫘" };

    // Make changeLanguage available globally so the HTML select tag can use it
    window.changeLanguage = function(lang) {
        currentLang = lang;
        
        // 1. Update all static UI elements
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (i18n[currentLang][key]) {
                element.innerHTML = i18n[currentLang][key];
            }
        });

        // 2. Update dynamic AI result if it exists on screen
        if (currentRecommendedCrop && !document.getElementById("result").classList.contains("hidden")) {
            document.getElementById("cropName").textContent = i18n[currentLang]["crop" + currentRecommendedCrop];
            document.getElementById("cropReason").textContent = i18n[currentLang]["reason" + currentRecommendedCrop];
            document.getElementById("scoreText").textContent = i18n[currentLang].scoreText + currentHighestScore + "/17";
        }
    };

    // Number Range Utility
    const inRange = (value, min, max) => value >= min && value <= max;

    // Handle Generate Recommendation Submit Form
    const cropForm = document.getElementById("cropForm");
    if(cropForm) {
        cropForm.addEventListener("submit", function (e) {
            e.preventDefault(); // STOP page refresh

            const btnText = document.getElementById("btnText");
            const loader = document.getElementById("loader");
            const resultDiv = document.getElementById("result");
            
            // Show Loader UI
            if(btnText && loader) {
                btnText.classList.add("hidden");
                loader.classList.remove("hidden");
            }
            if(resultDiv) resultDiv.classList.add("hidden");

            // Get Input Values safely
            const n = Number(document.getElementById("nitrogen").value || 0);
            const p = Number(document.getElementById("phosphorus").value || 0);
            const k = Number(document.getElementById("potassium").value || 0);
            const ph = Number(document.getElementById("soilph").value || 0);
            const temp = Number(document.getElementById("temperature").value || 0);
            const rain = Number(document.getElementById("rainfall").value || 0);

            // Scoring Logic
            const scores = { Ragi: 0, Jowar: 0, Coffee: 0, Banana: 0, Rice: 0, Maize: 0, Wheat: 0, Groundnut: 0, Potato: 0, Chickpea: 0 };

            if (inRange(temp, 20, 32)) scores.Ragi += 3; if (inRange(rain, 50, 120)) scores.Ragi += 4; if (inRange(ph, 5.0, 7.5)) scores.Ragi += 3; if (inRange(n, 100, 350)) scores.Ragi += 2; if (inRange(p, 20, 80)) scores.Ragi += 2; if (inRange(k, 30, 100)) scores.Ragi += 2;
            if (inRange(temp, 24, 35)) scores.Jowar += 4; if (inRange(rain, 40, 100)) scores.Jowar += 4; if (inRange(ph, 5.5, 8.0)) scores.Jowar += 3; if (inRange(n, 80, 200)) scores.Jowar += 2; if (inRange(p, 20, 70)) scores.Jowar += 2; if (inRange(k, 20, 80)) scores.Jowar += 2;
            if (inRange(temp, 18, 28)) scores.Coffee += 4; if (inRange(rain, 120, 300)) scores.Coffee += 4; if (inRange(ph, 5.0, 6.5)) scores.Coffee += 4; if (inRange(n, 100, 250)) scores.Coffee += 2; if (inRange(p, 30, 80)) scores.Coffee += 2; if (inRange(k, 50, 150)) scores.Coffee += 2;
            if (inRange(temp, 24, 35)) scores.Banana += 4; if (inRange(rain, 100, 300)) scores.Banana += 4; if (inRange(ph, 5.5, 7.5)) scores.Banana += 3; if (inRange(n, 150, 300)) scores.Banana += 2; if (inRange(p, 40, 100)) scores.Banana += 2; if (inRange(k, 60, 200)) scores.Banana += 3;
            if (inRange(temp, 20, 35)) scores.Rice += 4; if (inRange(rain, 150, 350)) scores.Rice += 5; if (inRange(ph, 5.5, 7.0)) scores.Rice += 3; if (inRange(n, 80, 250)) scores.Rice += 2; if (inRange(p, 30, 100)) scores.Rice += 2; if (inRange(k, 30, 150)) scores.Rice += 2;
            if (inRange(temp, 18, 32)) scores.Maize += 4; if (inRange(rain, 60, 180)) scores.Maize += 4; if (inRange(ph, 5.5, 7.5)) scores.Maize += 3; if (inRange(n, 100, 250)) scores.Maize += 2; if (inRange(p, 30, 100)) scores.Maize += 2; if (inRange(k, 30, 150)) scores.Maize += 2;
            if (inRange(temp, 10, 25)) scores.Wheat += 5; if (inRange(rain, 50, 120)) scores.Wheat += 3; if (inRange(ph, 6.0, 7.5)) scores.Wheat += 4; if (inRange(n, 80, 250)) scores.Wheat += 2; if (inRange(p, 20, 80)) scores.Wheat += 2; if (inRange(k, 20, 120)) scores.Wheat += 2;
            if (inRange(temp, 20, 30)) scores.Groundnut += 4; if (inRange(rain, 50, 140)) scores.Groundnut += 4; if (inRange(ph, 5.5, 7.0)) scores.Groundnut += 3; if (inRange(n, 20, 150)) scores.Groundnut += 2; if (inRange(p, 20, 80)) scores.Groundnut += 2; if (inRange(k, 20, 120)) scores.Groundnut += 2;
            if (inRange(temp, 15, 25)) scores.Potato += 5; if (inRange(rain, 50, 150)) scores.Potato += 3; if (inRange(ph, 5.0, 6.5)) scores.Potato += 4; if (inRange(n, 80, 250)) scores.Potato += 2; if (inRange(p, 30, 100)) scores.Potato += 2; if (inRange(k, 50, 200)) scores.Potato += 3;
            if (inRange(temp, 15, 30)) scores.Chickpea += 4; if (inRange(rain, 40, 110)) scores.Chickpea += 4; if (inRange(ph, 6.0, 8.0)) scores.Chickpea += 4; if (inRange(n, 20, 150)) scores.Chickpea += 2; if (inRange(p, 20, 80)) scores.Chickpea += 2; if (inRange(k, 20, 120)) scores.Chickpea += 2;

            currentRecommendedCrop = "Ragi";
            currentHighestScore = scores.Ragi;
            for (let crop in scores) {
                if (scores[crop] > currentHighestScore) {
                    currentHighestScore = scores[crop];
                    currentRecommendedCrop = crop;
                }
            }

            // Simulate Loading Delay
            setTimeout(() => {
                if(resultDiv) {
                    document.getElementById("cropIcon").textContent = icons[currentRecommendedCrop];
                    document.getElementById("cropName").textContent = i18n[currentLang]["crop" + currentRecommendedCrop];
                    document.getElementById("cropReason").textContent = i18n[currentLang]["reason" + currentRecommendedCrop];
                    document.getElementById("scoreText").textContent = i18n[currentLang].scoreText + currentHighestScore + "/17";
                    
                    if(btnText) btnText.classList.remove("hidden");
                    if(loader) loader.classList.add("hidden");
                    resultDiv.classList.remove("hidden");
                    
                    // Auto-scroll logic
                    resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }, 1000);
        });
    }

    // Initialize Default Language
    const langSelect = document.getElementById("langSelect");
    if(langSelect) {
        window.changeLanguage(langSelect.value);
    }
});