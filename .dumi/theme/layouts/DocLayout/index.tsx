import React, { useMemo } from 'react';
import Layout from 'dumi/theme-default/layouts/DocLayout';
import { useRouteMeta } from 'dumi';

export default ({ children, ...props }) => {
  // 统一注入默认配置
  const newProps = {
    ...props,
    // 覆盖默认 frontmatter
    frontmatter: {
      toc: 'content', // 目录默认显示内容
      ...props.frontmatter, // 页面级配置优先级更高
    },
  };

  const routeMeta = useRouteMeta(); 
  useMemo(() => {
    console.log(routeMeta);
    if(routeMeta.frontmatter.filename !== 'docs/index.md') {
      // 如果不是首页，确保 toc 显示内容
      routeMeta.frontmatter.toc = 'content';
    }
  }, [routeMeta]);

  
  return <Layout {...newProps}>{children}</Layout>;
};