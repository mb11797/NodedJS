require "selenium-webdriver"
include Selenium 
include Selenium::WebDriver

cFile = ARGV[0]
pageToLike = ARGV[1]
numOfPosts = ARGV[2].chomp.to_i

wait = Wait.new(:timeout => 3000)

# options = Selenium::WebDriver::Chrome::Options.new
options = Chrome::Options.new()
options.add_argument("--start-maximized")
options.add_argument("--disable-notifications")
driver = WebDriver.for(:chrome, options: options)
driver.navigate.to "https://facebook.com"
file = File.read(cFile)
map = JSON.parse(file)
user = map["user"]
pwd = map["password"]
# puts pwd
# wait until
wait.until{driver.find_element(:css, "input[type=email]")}
# find
email=driver.find_element(:css,"input[type=email]")
#input
email.send_keys(user)
password = driver.find_element(:css, "input[type=password]")
password.send_keys(pwd)
login = driver.find_element(:css, "input[type=submit]")
login.click()
# driver.quit

#****************Login********************
# wait
wait.until{driver.find_element(:css, "._1frb")}
searchBox = driver.find_element(:css, "._1frb")
searchBox.send_keys(pageToLike)
#searchBox.send_keys(:arrowdown)
searchBox.send_keys(:enter)

#****************search page*****************
wait.until{driver.find_element(:css, "li[data-edge=keywords_pages]")}
pages_tab = driver.find_element(:css, "li[data-edge=keywords_pages] a")
pages_tab.click()
wait.until{driver.find_element(:css,"._1glk._6phc.img")}
pages_img = driver.find_element(:css,"._1glk._6phc.img")
pages_img.click()

wait.until{driver.find_element(:css, "div[data-key=tab_posts]")}
pages_post = driver.find_element(:css, "div[data-key=tab_posts]")
pages_post.click()

idx = 0
while(idx < numOfPosts)
    # all_posts => resuest, time => page -> element display
    # present -> 1xnd => 7 post
    wait.until{driver.until(:css, "#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager")}
    #get all all_posts

    posts = driver.find_element(:css, "#pagelet_timeline_main_column ._1xnd>._4-u2._4-u8")
    cPost = posts[idx]
    wait.until{driver.find_element(:css, "._666k ._8c74")}
    like_btn = driver.find_element(:css, "._666k ._8c74")
    like_btn.click()
    puts idx
    idx+=1

    #selenium -> wait network => manually scroll
    if(idx == posts.length)
        driver.execute_script("window.scrollTo(0,document.body.clientHeight)")
        sleep 2
    end
end

# for file read - gem install json
# http://www.newthinktank.com/2015/02/ruby-programming-tutorial/
# yahan argv ki jagah ARGV hota hai aur yahan ARGV 0 se start ho jata hai jabki node vala input argv me 2 se start hota tha

# Serial work - using sync programming

# find 
# enter data
