import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomeArticle from './HomeArticle.js';

describe('HomeArticle component tests', () => {
    it('Should display the title passed as prop', () => {
        render(
            <BrowserRouter>
                <HomeArticle title="Test title" />
            </BrowserRouter>
        );

        expect(document.querySelector('h3').firstChild.textContent).toBe('Test title');
    });

    it('Should display the first 150 chars of the content passed as prop', () => {
        render(
            <BrowserRouter>
                <HomeArticle content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, modi temporibus officia voluptate tenetur unde quisquam ullam ipsam! Nam nesciunt quia et blanditiis ipsa ea aliquid rerum neque! Quasi voluptates cumque exercitationem officia. Ullam suscipit iusto consequuntur optio placeat culpa dolorum explicabo in, ab aperiam vero beatae facilis maiores adipisci quo fugiat voluptatibus, repellat asperiores voluptas autem, molestiae sit sequi dolores. Incidunt aliquam quis, modi magni fugiat aspernatur ducimus quidem, dignissimos veritatis sunt magnam quia quo sequi libero distinctio nobis facilis ipsum iste! Soluta nulla nihil commodi esse eveniet a eaque, fugit sunt nisi magnam. Tempore rem quia sint, adipisci eum natus dolorum amet facilis sit sapiente facere suscipit autem deleniti corrupti quas asperiores eius provident magni neque porro reiciendis mollitia odio soluta. Nemo autem dolorum iusto fuga fugiat sint, veritatis necessitatibus. Illo, iure. Maiores blanditiis error sequi quaerat facilis hic ipsum architecto assumenda soluta illo possimus doloribus ducimus quisquam, quod deleniti unde maxime fugit non, debitis, eum est eos!" />
            </BrowserRouter>
        );

        expect(document.querySelector('.description span').textContent).toHaveLength(150);
    })
})