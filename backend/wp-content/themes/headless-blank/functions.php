<?php
/**
 * Headless Blank Theme - Functions
 * فقط برای غیرفعال کردن فرانت‌اند وردپرس
 */

// جلوگیری از نمایش فرانت‌اند وردپرس (همه چیز به جز ادمین و API)
function headless_disable_frontend() {
    // اجازه دسترسی به این موارد:
    if (
        is_admin() ||
        strpos($_SERVER['REQUEST_URI'], '/wp-json/') === 0 ||
        strpos($_SERVER['REQUEST_URI'], '/graphql') !== false ||
        defined('REST_REQUEST') ||
        defined('DOING_AJAX') ||
        defined('DOING_CRON')
    ) {
        return;
    }

    // برای همه درخواست‌های دیگر: 404 برگردان
//     status_header(404);
//     nocache_headers();
//     include(get_query_template('404'));
//     exit;
    //ریدایرکت به next
    wp_redirect('http://localhost:3000', 301);
    exit;
}
add_action('template_redirect', 'headless_disable_frontend', 1);

// اختیاری: غیرفعال کردن فیدها و چیزهای غیرضروری
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);