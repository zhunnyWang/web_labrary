# web_labrary
Summary, related to HTML, CSS, Javascript, etc.
## Git常用指令总结
&emsp;&emsp;话不多说，我先上一张图，这张图可以说是让我茅塞顿开，虽然图是我自己画的，但github的整个管理模式和指令怎么用，却另有人指导，我就负责消化总结。


![Image text](https://user-gold-cdn.xitu.io/2019/3/12/16970de59b74b1d3?w=393&h=450&f=png&s=32583)
### 第一步 建立远程仓库和本地仓库  
&emsp;&emsp;我们想使用Git进行版本管理，必须先初始化仓库。初始化一个本地的git库，以及在GitHub上新建一个远程仓库。为防止混淆，我们一般把本地仓库和远程仓库的名字保持一致。  
&emsp;&emsp;初始化一个本地仓库，假设你的项目名称叫my-project：  

```
$ mkdir my-project
$ cd my-project
$ git init
```  
&emsp;&emsp;在GitHub上创建一个远程仓库，设置它的名称也为my-project，不要勾选 Initialize this repository with a README 选项，因为一旦勾选，就会与创建的本地仓库失去整合性：  

![Image text](https://user-gold-cdn.xitu.io/2019/3/12/1696f9e19e786d79?w=756&h=624&f=jpeg&s=75072)    
### 第二步 建立远程库和本地库的联系  
&emsp;&emsp;有两种方式，第一种情况是你先创建了一个项目，并且想用Git进行版本管理。你可以用git remote add命令将远程仓库my-project设置为本地仓库my-project的远程仓库，git push就可以将本地库中的内容推送至远程仓库了：  

```
 $ git remote add origin git@github.com:zhunnyWang/my-project.git
 $ git push -u origin master
```  
&emsp;&emsp;第二种情况是你的项目做大了，你邀请其他几个人和你一起开发，你们要一起用Git来进行版本管理。他们其他人就先要从远程仓库中把项目clone到本地，在本地仓库中开发自己的那一个部分。  

```
$ git clone git@github.com:zhunnyWang/my-project.git 
$ cd my-project
```  
### 第三步 更新本地仓库，同步远程仓库  
&emsp;&emsp;现在你建立了本地仓库与远程仓库的联系，并已经在本地项目文件夹下面写了一系列的文件。你打算把它推到远程仓库上去，你就需要进行下面一顿猛操作了： 
&emsp;&emsp;首先你要git add把本地文件加入一个临时的缓存区，可以通过git status查看缓存区中的内容。
```
$ git add . //把所有修改过的文件都提交
$ git add 文件名.后缀 //指定提交某个文件
$ git status
```  
&emsp;&emsp;如果你确认缓存区中的文件你都想要将其上传，接下来你就需要将缓存区中的内容git commit提交到本地仓库中。提交完成之后，可以通过git log来查看提交记录。记录会为每一次commit都生成一个hash值作为标识。当你把暂存区中文件全部commit到本地Git库，且你又没有修改文件，那么此时暂存区就是干净的。

```
$ git commit -m "First commit"
```  
&emsp;&emsp;你的本地库更新了，如果你确定这是你的一个版本，你就可以把它push到远程仓库了。

```
$ git push -u origin master
```  
### 第四步 回溯历史版本  
&emsp;&emsp;如果开发过程中你发现，某次更新可能有问题，你想要把它回滚到上一个版本，这时涉及到的回滚有四种情况：  
1. 你的项目中内容的回滚（工作区Working Directory）  

&emsp;&emsp;当你修改某个文件已经修改了很多次了，但发现业务逻辑可能写的有问题，这个时候你想回到没有修改本次内容之前。总不能让你一直Ctrl+Z吧。于是Git提供给你一个命令git checkout，你可以将你的文件内容回溯到上一次你commit这个文件时它的内容。

```
$ git checkout -- file1  //回滚单个文件
$ git checkout -- //全部回滚
```
21. 缓存区中的内容回滚（暂存区stage）  

&emsp;&emsp;当你用git add命令向缓存区加入了一系列文件准备提交到Git，但这时候你发现有个文件你并不想把它更新到Git库，这个时候就需要用命令git reset回溯暂存区，一旦文件重新回到工作树，回溯就用第四条规则了。  

```
$ git reset HEAD file1
$ git reset HEAD //全部回滚
```

3. 本地git库中的内容回滚（版本库repository）  

&emsp;&emsp;当你已经commit提交过了一系列版本，这是你发现最新的一个版本有问题，需要回溯到上一个提交的版本。你可能会用到git log命令查看每一次commit的commitID。在Git中，HEAD表示当前版本，HEAD^就是上一个版本，HEAD^^就是上上一个版本。git reflog查看命令历史。

```
$ git reset --hard HEAD^ //回溯到上一个版本，从未来回到过去。
$ git reset --hard commitID //回溯到某一个版本，对应它的commitID，比如你回溯到上一个版本之后后悔了，你就可以拿着之前git log时得到的未来那个版本的commitID，从过去回到未来。
```

4. 远程git库中的内容回滚    

&emsp;&emsp;这是我们最不想看到的情况，你把错误带到了公共开发的分支上，你要是不及时改正，那么开发的每个人可能都会深受其害。  

```
git revert
```

### 第五步 分支   
&emsp;&emsp;分支就是一个指针，在一条提交的时间线上，可能有多个分支，例如有master和branch两个分支，Git鼓励使用分支，这样的做法更加安全：  

![Image text](https://user-gold-cdn.xitu.io/2019/3/12/16970fc3cc4e3254?w=351&h=245&f=png&s=13374)  
查看分支：`git branch `   
创建分支：`git branch <name> `  
切换分支：`git checkout <name> `  
创建+切换分支：`git checkout -b <name>`    
合并某分支到当前分支：`git merge <name>`  
删除分支：`git branch -d <name>`  
查看合并分支图：`git log --graph`  

### 多人协作  
1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；  
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并（用git pull把最新的提交从origin/dev抓下来，git fetch + git merge == git pull）；  
3. 如果合并有冲突，则解决冲突，并在本地提交；  
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！  
5. 如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>。`  
  
多人协作参考了廖雪峰老师的Git教程：[https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013760174128707b935b0be6fc4fc6ace66c4f15618f8d000]()  




