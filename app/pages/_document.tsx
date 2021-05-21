import Document, { Head, Html, Main, NextScript } from "next/document";
// アプリケーションのページ移動するたびにstyleを挿入するため
import  { ServerStyleSheets } from "@material-ui/core"
import React from "react"

// ここでは各ページのコンテキストを取得してスタイルを引き出している
// そのスタイルをクライアント側に渡してレンダリングする
// その結果ちらつきを抑える
class MyDocument extends Document {
  static async getInitialProps(ctx){
    // Render the app and get the context of the page with collected side effects
    // アプリがレンダリングされるたびにページコンテキストを取得してスタイルシートを引き出す
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    // 拡張機能を提供する
    ctx.renderPage = () => originalRenderPage({ enhanceApp: (App) => (props) => sheets.collect(<App { ...props } />)})

    // 新しいPropsを渡すため
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ] };
  }
  render(){
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        </Html>
    )
  }
}

export default MyDocument;
