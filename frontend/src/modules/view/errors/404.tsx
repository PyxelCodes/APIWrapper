import { Link } from "react-router-dom"
import $ from 'jquery'


export const Custom404 = ({content}: any) => {

    document.getElementsByTagName("body")[0].style.backgroundColor = '#28254C'

    var pageX: any = $(document).width();
    var pageY: any = $(document).height();
    var mouseY = 0;
    var mouseX = 0;

    $(document).mousemove(function (event: any) {

        mouseY = event.clientY;
        let yAxis = (pageY / 2 - mouseY) / pageY * 300;

        mouseX = event.pageX / -pageX;
        let xAxis = -mouseX * 100 - 100;

        $('.box__ghost-eyes').css({ 'transform': 'translate(' + xAxis + '%,-' + yAxis + '%)' });

    });


    return (
        <div className="error-wrapper">
            <div className="box">
                <div className="box__ghost">
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>
                    <div className="symbol"></div>

                    <div className="box__ghost-container">
                        <div className="box__ghost-eyes">
                            <div className="box__eye-left"></div>
                            <div className="box__eye-right"></div>
                        </div>
                        <div className="box__ghost-bottom">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="box__ghost-shadow"></div>
                </div>

                <div className="box__description">
                    <div className="box__description-container">
                        <div className="box__description-title">Whoops!</div>
                        <div className="box__description-text">It seems like we couldn't find the { content } you were looking for</div>
                    </div>

                    <Link to={'/'} className="box__button">Go back</Link>

                </div>

            </div>
        </div>
    )
}
