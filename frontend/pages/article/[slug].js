import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"
import CommentsCompo from "../../components/comments"
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/map'), {
  ssr: false
});

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image)

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <div class="uk-animation-scale-up uk-transform-origin-bottom-right"></div>
        <div style={{ backgroundColor: "#ff000000" }} class="uk-animation-toggle" tabindex="0">
        <div style={{ backgroundColor: "#ff000000" }} class="uk-card uk-card-default uk-card-body uk-animation-scale-down uk-animation-reverse">
            <h1>{article.title}</h1>
        </div>
      </div>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          {article.map&&<Map map={article.map}></Map>}
          <ReactMarkdown children={article.content} escapeHtml={false} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.author.picture && (
                <NextImage unoptimized={false} image={article.author.picture} />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.author.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </p>
            </div>
            <div>
              <h5> MON COM</h5>
              <div>
                <CommentsCompo comments={article.comments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles")

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`)
  const categories = await fetchAPI("/categories")

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  }
}

export default Article
