<?php

switch (@$_GET['page']) {
    case 1: $data = array_fill(0, 10, 'Page 1: Server Data');
        break;
    case 2: $data = array_fill(0, 10, 'Page 2: Server Data');
        break;
    case 3: $data = array_fill(0, 10, 'Page 3: Server Data');
        break;
    case 4: $data = array_fill(0, 10, 'Page 4: Server Data');
        break;
    case 5: $data = array_fill(0, 10, 'Page 5: Server Data');
        break;
    case 6: $data = array_fill(0, 10, 'Page 6: Server Data');
        break;
    case 7: $data = array_fill(0, 10, 'Page 7: Server Data');
        break;
    case 8: $data = array_fill(0, 10, 'Page 8: Server Data');
        break;
    case 9: $data = array_fill(0, 10, 'Page 9: Server Data');
        break;
    case 10: $data = array_fill(0, 10, 'Page 10: Server Data');
        break;
    default:$data = [];
}

if (!count($data)) {
    switch (@$_GET['target_page']) {
        case 1: $data = array_fill(0, 10, 'Target Page 1: Server Data');
            break;
        case 2: $data = array_fill(0, 10, 'Target Page 2: Server Data');
            break;
        case 3: $data = array_fill(0, 10, 'Target Page 3: Server Data');
            break;
        default: $data = [];
    }
}

if (!empty($_GET['page']) && $_GET['page'] <= 10) {
    if (!empty($_GET['type']) && $_GET['type'] === 'ipsum') {
        if ($_GET['page'] >= 4) {
            exit;
        }
        die("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lorem, scelerisque id eros eu, cursus ultricies purus. Mauris congue nulla sed laoreet malesuada. Donec tristique ligula ornare enim interdum, nec molestie eros venenatis. Nulla gravida id nisi nec mollis. Nam id tortor risus. Morbi efficitur in diam at hendrerit. Suspendisse luctus vel risus in pharetra. Maecenas facilisis urna non nisi sagittis, a ullamcorper dolor molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In egestas aliquam porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<p>Suspendisse varius est vel luctus tristique. Donec lobortis facilisis dictum. Morbi vitae venenatis mauris, sed tempus eros. Fusce elementum nisl non nisi congue, sit amet laoreet dolor cursus. Vestibulum pharetra, arcu eget auctor finibus, orci sem egestas felis, et vehicula erat magna sit amet dolor. Proin sollicitudin bibendum risus elementum sagittis. Morbi molestie sapien a leo ultricies, vulputate maximus urna tristique. Proin finibus mauris in semper mattis. Aliquam laoreet turpis urna, non pharetra augue tincidunt ut. Praesent id dolor eleifend, congue tellus at, tristique lorem. Donec in velit id leo elementum condimentum at ac tortor. Suspendisse dignissim tempus purus, quis pulvinar nisl rhoncus vitae. Aenean id mollis sem. Donec fringilla mauris et lacus elementum, id tempus erat ullamcorper. Aenean efficitur nunc elit, in molestie arcu volutpat in.</p>");
    }
    $data = array_fill(0, 10, "Page {$_GET['page']}: Server Data");
}
else if (!empty($_GET['target_page']) && $_GET['target_page'] <= 5) {
    $data = array_fill(0, 10, "Page {$_GET['target_page']}: Server Data");
}
else {
    $data = [];
}

echo json_encode($data);
