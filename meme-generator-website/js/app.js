document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const downloadButton = document.getElementById('download-btn');
    const generateNewButton = document.getElementById('generate-new-btn');
    const memeResult = document.getElementById('meme-result');

    // 迷因模板集合
    const memeTemplates = [
        {
            image: 'https://i.imgflip.com/1bij.jpg',
            name: '一個人不能太簡單'
        },
        {
            image: 'https://i.imgflip.com/26am.jpg',
            name: '外星人理論'
        },
        {
            image: 'https://i.imgflip.com/1bgw.jpg',
            name: '蝙蝠俠摑羅賓'
        },
        {
            image: 'https://i.imgflip.com/9ehk.jpg',
            name: '等待的骷髏'
        },
        {
            image: 'https://i.imgflip.com/1h7in3.jpg',
            name: '聰明人'
        },
        {
            image: 'https://i.imgflip.com/1w7ygt.jpg',
            name: '崩潰哥'
        }
    ];

    // 機器人回應集合
    const botResponses = [
        '讓我想想，這個梗很適合你說的話...',
        '哈哈！我知道一個完美的迷因來配合這個！',
        '等等，我有一個更好的主意...',
        '這個對話太有趣了，讓我找個適合的迷因...',
        '讓我變出一個迷因來回應你...'
    ];

    let currentMemeTemplate = null;

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateMeme(userInput) {
        // 隨機選擇一個迷因模板
        currentMemeTemplate = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
        
        // 清空現有的迷因容器
        memeResult.innerHTML = '';

        // 創建迷因結構
        const memeWrapper = document.createElement('div');
        memeWrapper.className = 'meme-wrapper';
        
        const image = document.createElement('img');
        image.src = currentMemeTemplate.image;
        image.className = 'meme-image';
        image.crossOrigin = 'anonymous'; // 允許跨域圖片下載
        
        const topText = document.createElement('div');
        topText.className = 'meme-text top-text';
        topText.textContent = userInput;
        
        const bottomText = document.createElement('div');
        bottomText.className = 'meme-text bottom-text';
        bottomText.textContent = currentMemeTemplate.name;

        memeWrapper.appendChild(image);
        memeWrapper.appendChild(topText);
        memeWrapper.appendChild(bottomText);
        memeResult.appendChild(memeWrapper);
    }

    function downloadMeme() {
        if (!memeResult.querySelector('.meme-wrapper')) {
            alert('請先生成一個迷因！');
            return;
        }

        html2canvas(memeResult.querySelector('.meme-wrapper'), {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = '迷因-' + new Date().getTime() + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error('下載失敗:', err);
            alert('下載失敗，請稍後再試！');
        });
    }

    function handleUserInput() {
        const text = userInput.value.trim();
        if (text) {
            addMessage(text, true);
            userInput.value = '';

            // 生成機器人回應
            setTimeout(() => {
                const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage(botResponse);
                generateMeme(text);
            }, 500);
        }
    }

    // 事件監聽器
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    downloadButton.addEventListener('click', downloadMeme);
    generateNewButton.addEventListener('click', () => {
        if (userInput.value.trim()) {
            handleUserInput();
        } else {
            const lastUserMessage = chatMessages.querySelector('.user-message');
            if (lastUserMessage) {
                generateMeme(lastUserMessage.textContent);
            } else {
                alert('請先輸入一些文字！');
            }
        }
    });
});