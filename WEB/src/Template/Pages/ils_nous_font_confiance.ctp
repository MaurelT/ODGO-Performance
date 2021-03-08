
<div class="back-black">
    <section id="WhoWeAre">
        <div class="container">
          123
        </div>
    </section>
</div>

<section id="back-to-top">
    <i class="fa fa-angle-up"></i>
</section>

<?php $this->append('script') ?>
<script>
    var offset = 450;
    var duration = 1000;
    var upToTop = $("#back-to-top");
    upToTop.hide();
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
            upToTop.fadeIn(duration);
        } else {
            upToTop.fadeOut(duration);
        }
    });
    upToTop.on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    });
</script>
<?php $this->end() ?>
