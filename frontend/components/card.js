import React from "react"
import Link from "next/link"
import NextImage from "./image"

const Card = ({ article }) => {
  return (
    <Link as={`/article/${article.slug}`} href="/article/[id]">
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div class="uk-animation-toggle" tabindex="0">
            <div style={{ padding: 0 }} class="uk-card uk-card-default uk-card-body uk-animation-scale-up uk-transform-origin-top-center">
              <NextImage image={article.image} />
            </div>
          </div>
          <div class="uk-animation-toggle" tabindex="0">
            <div class="uk-card uk-card-default uk-card-body uk-animation-scale-down">
              <div className="uk-card-body">
                <p id="category" className="uk-text-uppercase">
                  {article.category.name}
                </p>
                <p id="title" className="uk-text-large">
                  {article.title}
                </p>
              </div>
            </div>

          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
