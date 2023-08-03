import iconFail from '../images/noscs.png';
import { useNavigate } from 'react-router-dom';

function NotFoundPage(props){
    const navigate = useNavigate();

    return(
        <section className={`popup popup_type_notice popup_opened`}>
            <div className={`popup__container popup__container_type_notice`}>
                <img className="popup__icon" src={iconFail} />
                <h3 className="popup__title">Запрашиваемая страница не найдена</h3>
                <button className="popup__close" type="button" onClick={() => navigate('/')} />
            </div>
        </section>
    )
}

export default NotFoundPage;