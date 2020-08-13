import React from "react"
import Page from "./Page"
import { Link } from "react-router-dom"

function ViewSinglePost() {
  return (
    <Page title="Hardcoded Title">
      <div className="d-flex justify-content-between">
        <h2>Example Post Title</h2>
        <span className="pt-2">
          <Link href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </Link>
          <Link className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </Link>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link href="/">
          <img className="avatar-tiny" src="http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon" alt="avatar" />
        </Link>
        Posted by <Link href="/">Matas</Link> on 12/08/2020
      </p>

      <div className="body-content">
        <p>
          Lorem ipsum dolor sit <strong>example</strong> post adipisicing elit. Tempore qui possimus soluta impedit natus voluptate, sapiente saepe modi est pariatur. Aut voluptatibus aspernatur fugiat asperiores at.
        </p>
        <p>Lorem ipsum dolor sit, Beatae quod asperiores corrupti omnis qui, placeat neque modi, dignissimos, explicabo nulla tempora rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea at esse, tempore qui possimus soluta impedit natus voluptate, sapiente saepe modi est pariatur. Aut voluptatibus aspernatur fugiat asperiores at.</p>
      </div>
    </Page>
  )
}

export default ViewSinglePost
