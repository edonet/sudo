
" -----------------------------------------
" 基本设置
" -----------------------------------------
syntax enable                       " syntax highlighting
set autoread                        " Set to auto read when a file is changed from the outside
set lazyredraw                      " Don't redraw while executing macros (good performance config)
set history=500                     " Set how many lines of history VIM has to remember
set showmode                        " show mode
set ruler                           " show the cursor position
set number                          " show line number
set numberwidth=4                   " number width
set ttyfast
set t_Co=256                        " Show Color as RGB 256
set background=dark                 " background style
set hid                             " A buffer becomes hidden when it is abandoned
set ignorecase                      " Ignore case when searching
set smartcase                       " When searching try to be smart about cases
set hlsearch                        " Highlight search results
set incsearch                       " Makes search act like search in modern browsers
set magic                           " For regular expressions turn magic on
set showmatch                       " Show matching brackets when text indicator is over them
set mat=2                           " How many tenths of a second to blink when matching brackets
set isk+=-                          " - as words
set guifont=Inconsolata:h12         " GUI font


" -----------------------------------------
" 缩进与换行设置
" -----------------------------------------
set ai                              " Auto indenting
set si                              " Smart indent
set wrap                            " Auto wrap lines
set whichwrap+=<,>,h,l              " Wrap keys
set expandtab                       " Use spaces instead of tabs
set smarttab                        " Be smart when using tabs ;)
set tabstop=4                       " 1 tab == 4 spaces
set shiftwidth=4                    " 1 shift width 4 spaces
set softtabstop=2                   " Soft tab width
set backspace=eol,start,indent      " Configure backspace so it acts as it should act
autocmd FileType python setlocal tabstop=4 shiftwidth=4 softtabstop=4


" -----------------------------------------
" 状态栏设置
" -----------------------------------------
" %(...%)           定义一个项目组。
" %{n}*             %对其余的行使用高亮显示组Usern，直到另一个%n*。数字n必须从1到9。用%*或%0*可以恢复正常的高亮显示。
" %<                如果状态行过长，在何处换行。缺省是在开头。
" %=                左对齐和右对齐项目之间的分割点。
" %                 字符%
" %B                光标下字符的十六进制形式
" %F                缓冲区的文件完整路径
" %H                如果为帮助缓冲区则显示为HLP
" %L                缓冲区中的行数
" %M                如果缓冲区修改过则显示为+
" %N                打印机页号
" %O                以十六进制方式显示文件中的字符偏移
" %P                文件中光标前的%
" %R                如果缓冲区只读则为RO
" %V                列数。如果与%c相同则为空字符串
" %W                如果窗口为预览窗口则为PRV
" %Y                缓冲区的文件类型，如vim
" %a                如果编辑多行文本，这个字行串就是({current} of {arguments})，例如：(5 of 18)。如果在命令行中只有一行，这个字符串为空
" %b                光标下的字符的十进制表示形式
" %c                列号
" %f                缓冲区的文件路径
" %h                如果为帮助缓冲区显示为[Help]
" %l                行号
" %m                如果缓冲区已修改则表示为[+]
" %n                缓冲区号
" %o                在光标前的字符数（包括光标下的字符）
" %p                文件中所在行的百分比
" %r                如果缓冲区为只读则表示为[RO]
" %t                文件名(无路径)
" %v                虚列号
" %w                如果为预览窗口则显示为[Preview]
" %y                缓冲区的文件类型，如[vim]
" %{expr}           表达式的结果
" -----------------------------------------
set cmdheight=2                                        " Height of the command bar
set laststatus=2                                       " Always show the status line
set statusline=
set statusline+=\[%n]                                  " buffernr
set statusline+=\ %<%F\                                " File+path
set statusline+=\ %y\                                  " FileType
set statusline+=\ %{''.(&fenc!=''?&fenc:&enc).''}      " Encoding
set statusline+=\ %{(&bomb?\",BOM\":\"\")}\            " Encoding2
set statusline+=\ %{&ff}\                              " FileFormat (dos/unix..)
set statusline+=\ %{&spelllang}\                       " Spellanguage
set statusline+=\ %=\ row:%l/%L\ (%03p%%)\             " Rownumber/total (%)
set statusline+=\ col:%03c\                            " Colnumber
set statusline+=\ \ %m%r%w\ %P\ \                      " Modified? Readonly? Top/bot.


" -----------------------------------------
" 编码设置
" -----------------------------------------
set fenc=utf-8                      " Set utf8 as file encoding
set encoding=utf8                   " Set utf8 as standard encoding and en_US as the standard language
set ffs=unix,dos,mac                " Use Unix as the standard file type
set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1
