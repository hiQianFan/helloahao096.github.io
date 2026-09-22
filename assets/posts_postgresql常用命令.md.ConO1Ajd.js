import{G as e,W as t,it as n,n as r}from"./chunks/framework.2K1covnI.js";var i=JSON.parse(`{"title":"postgresql 常用命令","description":"postgresql 常用命令","frontmatter":{"title":"postgresql 常用命令","description":"postgresql 常用命令","date":"2024-07-01T00:00:00.000Z","tags":["PostgreSQL","数据库"]},"headers":[],"relativePath":"posts/postgresql常用命令.md","filePath":"posts/postgresql常用命令.md","lastUpdated":1764670496000}`),a={name:`posts/postgresql常用命令.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<blockquote><p>参考资料: <a href="https://www.cnblogs.com/my-blogs-for-everone/p/10226473.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/my-blogs-for-everone/p/10226473.html</a><a href="https://ken.io/note/macos-postgresql-install-and-configuration" target="_blank" rel="noreferrer">https://ken.io/note/macos-postgresql-install-and-configuration</a></p></blockquote><h1 id="mac-命令" tabindex="-1">mac 命令 <a class="header-anchor" href="#mac-命令" aria-label="Permalink to “mac 命令”">​</a></h1><div class="language-shell"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 查看服务状态</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> services</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 启动服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> services</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> postgresql</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 连接进入数据库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">psql</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -U</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> postgres</span><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"> # -U 指定用户</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">psql</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> postgres</span><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"> # -d 指定数据库</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 重启服务（brew安装）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> services</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> postgresql@15</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 重启服务（dmg安装，通过-D指定数据目录）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pg_ctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /Library/PostgreSQL/15/data</span></span></code></pre></div><h1 id="postgresql-操作命令" tabindex="-1">postgresql 操作命令 <a class="header-anchor" href="#postgresql-操作命令" aria-label="Permalink to “postgresql 操作命令”">​</a></h1><div class="language-shell"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 查看所有用户</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\du</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 查看所有数据库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\l</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 切换当前数据库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {dbname}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 查看当前库下所有的表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\dt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 查看指定表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {tablename}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 查看数据目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SHOW</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> data_directory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#62687b;--shiki-dark:#818e99;"># 退出psql</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">\\q</span></span></code></pre></div>`,5)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};