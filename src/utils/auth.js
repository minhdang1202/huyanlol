import React, { Component } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import CookieUtil from "./cookie";
import Cookie from "js-cookie";
import { PathConstant, AppConstant } from "../const";

export const auth = ctx => {
  const cookiesData = nextCookie(ctx);
  let token = cookiesData[AppConstant.KEY_TOKEN];
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: PathConstant.LOGIN });
    ctx.res.end();
    return;
  }

  if (!token) {
    Router.replace(PathConstant.LOGIN);
  }

  return token;
};

export const hasLogged = () => Boolean(Cookie.get(AppConstant.KEY_TOKEN));

export const login = data => {
  CookieUtil.setCookieData(data);
  Router.replace(PathConstant.HOME);
};

export const logout = () => {
  Cookie.remove(AppConstant.KEY_TOKEN);
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || "Component";

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = auth(ctx);

      const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
