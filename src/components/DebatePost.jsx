import { useState } from 'react'
import PostComments from './PostComments'
import PostContent from './PostContent'
import postData from '../postData'

export default function DebatePost() {


  const [comments, setComments] = useState(postData.comments)
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  function handleUserName(e){
    setUserName(e.target.value)
  }

  function handleCommentText(e){
    setCommentText(e.target.value)
  }

  function handleIsAnonymous(e){
    setIsAnonymous(e.target.checked)
    if (e.target.checked) {
      setUserName('');
    }
  }

 

  function handleSubmit(e){
    e.preventDefault()
    if(commentText && (isAnonymous || userName)){
      const newComment =  {
        id: crypto.randomUUID(),
        userName: isAnonymous ? 'AnonimKullanıcı' : userName,
        isAnonymous: isAnonymous,
        commentText: commentText
      }
      setComments([...comments, newComment]);
      setUserName('');
      setCommentText('');
      setIsAnonymous(false);
    }
  }

  return (
    <div className='post-container'>
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className='text-input'
          type='text'
          placeholder='Kullanıcı adı girin.'
          value={userName}
          onChange={handleUserName}
          disabled={isAnonymous}
        />
        <textarea placeholder='Ne düşünüyorsunuz?' value={commentText} onChange={handleCommentText}/>
        <label>
          <input className='checkbox' type='checkbox' checked={isAnonymous} onChange={handleIsAnonymous}/>
          İsimsiz mi göndereyim?
        </label>
        <button>Gönder</button>
      </form>
    </div>
  )
}


  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/